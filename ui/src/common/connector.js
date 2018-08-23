import React, { Component } from "react";
import { StateHolder } from "./stateHolder";

class PromiseState {
	constructor(config, setState) {
		this.name = config.name;
		this.params = config.params;
		this.promiseFunction = config.promise;
		this.handleUpdate = config.handleUpdate;
		this.setState = setState;

		this.paramsHash = null;
		this.callback = null;

		this.updateState = this.updateState.bind(this);
		this.getActiveParams = this.getActiveParams.bind(this);
		this.autoRun = this.autoRun.bind(this);
		this.call = this.call.bind(this);
		this.refresh = this.refresh.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.reset = this.reset.bind(this);

		this.reset(false);
	}

	updateState() {
		this.setState({ [this.name]: this });
	}

	createHash(params) {
		return JSON.stringify(params);
	}

	getActiveParams() {
		const { params } = this;
		const activeParams = {};
		Object.keys(params)
			.filter(key => !["page", "size", "sort"].includes(key))
			.filter(key => params[key] != null)
			.forEach(key => (activeParams[key] = params[key]));
		return activeParams;
	}

	autoRun(newParams) {
		if (this.params === undefined) {
			return; // don't auto run if there is no params
		}
		const newHash = this.createHash(newParams);
		if (newHash !== this.paramsHash) {
			// hash is different -> run
			this.params = newParams;
			this.paramsHash = newHash;
			this.call();
		}
	}

	subscribe(callback) {
		this.callback = callback;
	}

	reset(updateState = true) {
		this.fulfilled = false;
		this.pending = false;
		this.rejected = false;
		this.value = null;
		this.reason = null;
		if (updateState) {
			this.updateState();
		}
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

export class Connect extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		const { children, ...config } = props;
		Object.keys(config).forEach(name => {
			const singleConfig = config[name];
			singleConfig.name = name;
			singleConfig.handleUpdate = props.handleUpdate;
			this.state[name] = new PromiseState(
				singleConfig,
				this.setState.bind(this)
			);
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
			const params = props[key].params;
			const promiseState = this.state[key];
			promiseState.autoRun(params);
		});
	};

	render() {
		return this.props.children({ ...this.state });
	}
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

class ConnectedUsers extends Component {
	render() {
		return (
			<StateHolder>
				{({ handleUpdate, params }) => (
					<Connect
						findAll={{
							params, // compare and automatically run on change
							handleUpdate,
							promise: params =>
								new Promise(resolve =>
									setTimeout(() => resolve([{ name: params.name }]), 2000)
								),
						}}
						create={{
							promise: params => Promise.resolve(), // no params -> don't run automatically
						}}
					>
						{({ findAll, create }) => (
							<Users findAll={findAll} create={create} />
						)}
					</Connect>
				)}
			</StateHolder>
		);
	}
}

export { ConnectedUsers as Users };
