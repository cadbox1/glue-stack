package org.gluestack.api;

import java.util.List;

/**
 * issue: https://stackoverflow.com/questions/34984166/spring-data-page-pageable-cant-deserialization-how-to-use
 * solution: https://blog.thecookinkitchen.com/how-to-consume-page-response-from-a-service-in-spring-boot-97293c18ba
 *
 * @param <T>
 */
public class PageResponse<T> {

	private int number;
	private int size;
	private int totalPages;
	private int numberOfElements;
	private long totalElements;
	private boolean previousPage;
	private boolean first;
	private boolean nextPage;
	private boolean last;
	private List<T> content;

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getNumberOfElements() {
		return numberOfElements;
	}

	public void setNumberOfElements(int numberOfElements) {
		this.numberOfElements = numberOfElements;
	}

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public boolean isPreviousPage() {
		return previousPage;
	}

	public void setPreviousPage(boolean previousPage) {
		this.previousPage = previousPage;
	}

	public boolean isFirst() {
		return first;
	}

	public void setFirst(boolean first) {
		this.first = first;
	}

	public boolean isNextPage() {
		return nextPage;
	}

	public void setNextPage(boolean nextPage) {
		this.nextPage = nextPage;
	}

	public boolean isLast() {
		return last;
	}

	public void setLast(boolean last) {
		this.last = last;
	}

	public List<T> getContent() {
		return content;
	}

	public void setContent(List<T> content) {
		this.content = content;
	}
}
