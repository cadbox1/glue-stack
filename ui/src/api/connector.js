import React, { Component } from "react";

class PromiseState {
	constructor(config, setState) {
		this.name = config.name;
		this.handleUpdate = config.handleUpdate;
		this.paramsFunction = config.params;
		this.promiseFunction = config.promise;
		this.setState = setState;

		this.fulfilled = false;
		this.pending = false;
		this.rejected = false;
		this.value = null;
		this.reason = null;

		this.paramsHash = null;
		this.callback = null;

		this.autoRun = this.autoRun.bind(this);
		this.call = this.call.bind(this);
		this.refresh = this.refresh.bind(this);
		this.subscribe = this.subscribe.bind(this);
	}

	updateState() {
		this.setState({ [this.name]: this });
	}

	createHash(params) {
		return JSON.stringify(params);
	}

	autoRun(props) {
		if (!this.paramsFunction) {
			return; // don't auto run if there is no paramsFunction
		}
		const params = this.paramsFunction(props);
		const newHash = this.createHash(params);
		if (newHash !== this.paramsHash) {
			// hash is different -> run
			this.params = params;
			this.paramsHash = newHash;
			this.call();
		}
	}

	subscribe(callback) {
		this.callback = callback;
	}

	refresh() {
		this.call();
	}

	call() {
		const params = [].slice.call(arguments);
		if (!params[0]) {
			params[0] = this.params;
		}
		this.pending = true;
		this.updateState();
		this.currentPromise = this.promiseFunction.apply(this, params).then(
			result => {
				this.pending = false;
				this.rejected = false;
				this.fulfilled = true;
				this.value = result;
				this.updateState();
				if (this.callback) {
					this.callback(result);
				}
				return result;
			},
			err => {
				this.pending = false;
				this.rejected = true;
				this.fulfilled = false;
				this.reason = err;
				this.updateState();
				throw err;
			}
		);
		return this.currentPromise;
	}
}

export function connect(allConfig) {
	return function(WrappedComponent) {
		return class Connect extends Component {
			constructor(props) {
				super(props);
				this.state = {};
				Object.keys(allConfig).forEach(name => {
					const config = allConfig[name];
					config.name = name;
					config.handleUpdate = props.handleUpdate;
					this.state[name] = new PromiseState(config, this.setState.bind(this));
				});
			}

			componentDidMount() {
				this.handleUpdate();
			}

			componentWillReceiveProps(nextProps) {
				this.handleUpdate(nextProps);
			}

			handleUpdate = (props = this.props) => {
				Object.keys(this.state).forEach(key => {
					const promiseState = this.state[key];
					promiseState.autoRun(props);
				});
			};

			render() {
				return <WrappedComponent {...this.props} {...this.state} />;
			}
		};
	};
}

// example

class Users extends Component {
	handleCreate = () => {
		this.props.create.call({ name: "new thing" }).then(result => {
			this.props.findAll.call();
		});
	};

	render() {
		const { findAll, create } = this.props;
		return (
			<div>
				<button onClick={this.handleCreate}>
					{create.pending ? "Creating..." : "Create"}
				</button>
				{create.rejected && <p>Error: {create.reason}</p>}
				{findAll.rejected && <p>Error: {findAll.reason}</p>}
				<p>{findAll.pending && "Pending..."}</p>
				<ul>
					{findAll.value &&
						findAll.value.map(item => <li key={item.name}>{item.name}</li>)}
				</ul>
			</div>
		);
	}
}

Users = connect({
	findAll: {
		params: props => ({ name: "cheddar" }), // compare and automatically run on change
		promise: params =>
			new Promise(resolve =>
				setTimeout(() => resolve([{ name: params.name }]), 2000)
			),
	},
	create: {
		promise: params => Promise.resolve(), // no params -> don't run automatically
	},
})(Users);

export { Users };
