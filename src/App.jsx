import './App.css'
import { useEffect, useState } from 'react'

import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'
import Dashboard from './components/Dashboard'
import FilterBar from './components/FilterBar'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'

import useLocalStorage from './hooks/useLocalStorage'

import {
    filterAndSortApplications
} from './utils/applicationUtils'

function App() {

    const [applications, setApplications] =
        useLocalStorage("applications", [
            
        ])

    const [editingApplication, setEditingApplication] =
        useState(null)

    const [searchTerm, setSearchTerm] =
        useState("")

    const [statusFilter, setStatusFilter] =
        useState("All")

    const [sortOrder, setSortOrder] =
        useState("newest")

    useEffect(() => {

        document.title =
            `Job Tracker (${applications.length})`

    }, [applications])

    function handleAddApplication(application) {

        const newApplication = {
            ...application,

            statusHistory: [
                {
                    status: application.status,
                    changedAt:
                        new Date().toISOString()
                }
            ]
        }

        setApplications((previousApplications) => [
            ...previousApplications,
            newApplication
        ])
    }

    function handleDuplicateApplication(
        application
    ) {

        const now =
            new Date().toISOString()

        const duplicatedApplication = {
            ...application,

            id: Date.now(),

            updatedAt: now,

            statusHistory: [
                {
                    status: application.status,
                    changedAt: now
                }
            ]
        }

        setApplications((previousApplications) => [
            ...previousApplications,
            duplicatedApplication
        ])
    }

    function handleDelete(id) {

        setApplications((previousApplications) =>
            previousApplications.filter(
                (application) =>
                    application.id !== id
            )
        )
    }

    function handleClearAll() {

        const confirmed = window.confirm(
            "Are you sure you want to delete all applications?"
        )

        if (confirmed) {
            setApplications([])
        }
    }

    function handleEdit(application) {

        setEditingApplication(application)
    }

    function handleUpdateApplication(
        updatedApplication
    ) {

        setApplications((previousApplications) =>
            previousApplications.map(
                (application) =>
                    application.id ===
                    updatedApplication.id
                        ? {
                            ...updatedApplication,

                            statusHistory:
                                application.statusHistory ||
                                [
                                    {
                                        status:
                                            updatedApplication.status,
                                        changedAt:
                                            new Date().toISOString()
                                    }
                                ]
                        }
                        : application
            )
        )

        setEditingApplication(null)
    }

    function handleStatusChange(
        id,
        newStatus
    ) {

        setApplications((previousApplications) =>
            previousApplications.map(
                (application) => {

                    if (application.id !== id) {
                        return application
                    }

                    if (application.status === newStatus) {
                        return application
                    }

                    const newHistoryEntry = {
                        status: newStatus,
                        changedAt:
                            new Date().toISOString()
                    }

                    return {
                        ...application,

                        status: newStatus,

                        updatedAt:
                            new Date().toISOString(),

                        statusHistory: [
                            ...(application.statusHistory || []),
                            newHistoryEntry
                        ]
                    }
                }
            )
        )
    }

    function handleCancelEdit() {

        setEditingApplication(null)
    }

    function handleSearch(value) {

        setSearchTerm(value)
    }

    function handleFilterChange(value) {

        setStatusFilter(value)
    }

    function handleClearFilters() {

        setSearchTerm("")
        setStatusFilter("All")
    }

    function handleSortChange(value) {

        setSortOrder(value)
    }

    const filteredApplications =
        filterAndSortApplications(
            applications,
            searchTerm,
            statusFilter,
            sortOrder
        )

    return (
        <>
            <Navbar />

            <main>

                <h1>Job Application Tracker</h1>

                <Dashboard
                    applications={applications}
                />

                <SearchBar
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    onClearFilters={handleClearFilters}
                />

                <FilterBar
                    statusFilter={statusFilter}
                    onFilterChange={handleFilterChange}
                    sortOrder={sortOrder}
                    onSortChange={handleSortChange}
                />

                <ApplicationForm
                    onAddApplication={handleAddApplication}
                    editingApplication={editingApplication}
                    onUpdateApplication={
                        handleUpdateApplication
                    }
                    onCancelEdit={handleCancelEdit}
                />

                <ApplicationList
                    applications={filteredApplications}
                    onDeleteApplication={handleDelete}
                    onEditApplication={handleEdit}
                    onClearAll={handleClearAll}
                    onStatusChange={handleStatusChange}
                    onDuplicateApplication={
                        handleDuplicateApplication
                    }
                />

            </main>
        </>
    )
}

export default App
