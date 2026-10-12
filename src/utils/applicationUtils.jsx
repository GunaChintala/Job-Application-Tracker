export function filterAndSortApplications(
    applications,
    searchTerm,
    statusFilter,
    sortOrder
) {

    return applications
        .filter((application) => {

            const matchesSearch =
                application.company
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||

                application.position
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||

                application.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

            const matchesStatus =
                statusFilter === "All" ||
                application.status === statusFilter

            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {

            const dateA = new Date(a.appliedDate)
            const dateB = new Date(b.appliedDate)

            if (sortOrder === "newest") {
                return dateB - dateA
            }

            return dateA - dateB
        })
}