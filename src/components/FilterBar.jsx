function FilterBar({
    statusFilter,
    onFilterChange,
    sortOrder,
    onSortChange
}) {

    return (
        <div className="filter-container">

            <label htmlFor="status-filter">
                Filter by Status:
            </label>

            <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
            </select>

            <label htmlFor="sort-order">
                Sort by Date:
            </label>

            <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>

        </div>
    )
}

export default FilterBar