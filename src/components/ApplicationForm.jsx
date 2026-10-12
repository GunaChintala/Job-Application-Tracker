import { useEffect, useState } from 'react'

function ApplicationForm({
    onAddApplication,
    editingApplication,
    onUpdateApplication,
    onCancelEdit
}) {

    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [location, setLocation] = useState("")
    const [status, setStatus] = useState("Applied")
    const [appliedDate, setAppliedDate] = useState("")
    const [jobUrl, setJobUrl] = useState("")
    const [notes, setNotes] = useState("")
    const [error, setError] = useState("")

    function onSubmit(e) {

        e.preventDefault()

        if (!company.trim()) {
            setError("Company name is required")
            return
        }

        if (!position.trim()) {
            setError("Position is required")
            return
        }

        if (!location.trim()) {
            setError("Location is required")
            return
        }

        if (!appliedDate) {
            setError("Applied date is required")
            return
        }

        setError("")

        if (editingApplication) {

            const updatedApplication = {
                id: editingApplication.id,
                company,
                position,
                location,
                status,
                appliedDate,
                jobUrl,
                notes,
                updatedAt: new Date().toISOString()
            }

            onUpdateApplication(
                updatedApplication
            )

        } else {

            const newApplication = {
                id: Date.now(),
                company,
                position,
                location,
                status,
                appliedDate,
                jobUrl,
                notes,
                updatedAt: new Date().toISOString()
            }

            onAddApplication(
                newApplication
            )

            setCompany("")
            setPosition("")
            setLocation("")
            setStatus("Applied")
            setAppliedDate("")
            setJobUrl("")
            setNotes("")
        }
    }

    useEffect(() => {

        if (editingApplication) {

            setCompany(
                editingApplication.company
            )

            setPosition(
                editingApplication.position
            )

            setLocation(
                editingApplication.location
            )

            setStatus(
                editingApplication.status
            )

            setAppliedDate(
                editingApplication.appliedDate || ""
            )

            setJobUrl(
                editingApplication.jobUrl || ""
            )

            setNotes(
                editingApplication.notes || ""
            )

            setError("")

        } else {

            setCompany("")
            setPosition("")
            setLocation("")
            setStatus("Applied")
            setAppliedDate("")
            setJobUrl("")
            setNotes("")
            setError("")
        }

    }, [editingApplication])

    return (
        <form onSubmit={onSubmit}>

            <h2>
                {editingApplication
                    ? "Edit Application"
                    : "Add Application"}
            </h2>

            {error && (
                <p>
                    {error}
                </p>
            )}

            <div>
                <label htmlFor="company">
                    Company Name
                </label>

                <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) =>
                        setCompany(e.target.value)
                    }
                    placeholder="Enter company name"
                />
            </div>

            <div>
                <label htmlFor="position">
                    Position
                </label>

                <input
                    id="position"
                    type="text"
                    value={position}
                    onChange={(e) =>
                        setPosition(e.target.value)
                    }
                    placeholder="Enter job position"
                />
            </div>

            <div>
                <label htmlFor="location">
                    Location
                </label>

                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                    placeholder="Enter job location"
                />
            </div>

            <div>
                <label htmlFor="status">
                    Status
                </label>

                <select
                    id="status"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >
                    <option value="Applied">
                        Applied
                    </option>

                    <option value="Interview">
                        Interview
                    </option>

                    <option value="Rejected">
                        Rejected
                    </option>

                    <option value="Offer">
                        Offer
                    </option>
                </select>
            </div>

            <div>
                <label htmlFor="appliedDate">
                    Applied Date
                </label>

                <input
                    id="appliedDate"
                    type="date"
                    value={appliedDate}
                    onChange={(e) =>
                        setAppliedDate(e.target.value)
                    }
                />
            </div>

            <div>
                <label htmlFor="jobUrl">
                    Job URL
                </label>

                <input
                    id="jobUrl"
                    type="url"
                    value={jobUrl}
                    onChange={(e) =>
                        setJobUrl(e.target.value)
                    }
                    placeholder="https://example.com/job"
                />
            </div>

            <div>
                <label htmlFor="notes">
                    Notes
                </label>

                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                    placeholder="Add notes about this application"
                />
            </div>

            <button type="submit">
                {editingApplication
                    ? "Update Application"
                    : "Add Application"}
            </button>

            {editingApplication && (
                <button
                    type="button"
                    onClick={onCancelEdit}
                >
                    Cancel
                </button>
            )}

        </form>
    )
}

export default ApplicationForm