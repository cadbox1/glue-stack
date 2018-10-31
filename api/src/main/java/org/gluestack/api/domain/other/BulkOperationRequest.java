package org.gluestack.api.domain.other;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

public class BulkOperationRequest {
	private List<Integer> ids;
	private JsonNode body;

	/**
	 * @return the ids
	 */
	public List<Integer> getIds() {
		return ids;
	}

	/**
	 * @return the body
	 */
	public JsonNode getBody() {
		return body;
	}

	/**
	 * @param body the body to set
	 */
	public void setBody(JsonNode body) {
		this.body = body;
	}

	/**
	 * @param ids the ids to set
	 */
	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}
}