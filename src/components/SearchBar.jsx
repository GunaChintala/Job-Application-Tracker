function SearchBar({
    searchTerm,
    onSearch,
    onClearFilters
}) {
    return (
        <div className="search-container">

            <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />

            <button onClick={onClearFilters}>
                Clear Filters
            </button>

        </div>
    )
}

export default SearchBar