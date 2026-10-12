import { useState } from 'react'

function ApplicationCard({
    application,
    onDeleteApplication,
    onEditApplication,
    onStatusChange,
    onDuplicateApplication
}) {

    const [showDetails, setShowDetails] =
        useState(false)

    function handleToggleDetails() {

        setShowDetails((previousValue) =>
            !previousValue
        )
    }

    return (
        <div className="application-card">

            <h3>{application.company}</h3>

            <p>{application.position}</p>

            <p>{application.location}</p>

            <select
                value={application.status}
                onChange={(e) =>
                    onStatusChange(
                        application.id,
                        e.target.value
                    )
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

            <p>
                Applied Date: {application.appliedDate}
            </p>

            <button
                type="button"
                onClick={handleToggleDetails}
            >
                {showDetails
                    ? "Hide Details"
                    : "View Details"}
            </button>

            {showDetails && (
                <div>

                    {application.updatedAt && (
                        <p>
                            Last Updated:{" "}
                            {new Date(
                                application.updatedAt
                            ).toLocaleString()}
                        </p>
                    )}

                    {application.jobUrl && (
                        <p>
                            <a
                                href={application.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Job
                            </a>
                        </p>
                    )}

                    {application.notes && (
                        <p>
                            Notes: {application.notes}
                        </p>
                    )}

                    {application.statusHistory &&
                        application.statusHistory.length > 0 && (

                            <div>

                                <h4>
                                    Status History
                                </h4>

                                {application.statusHistory.map(
                                    (history, index) => (

                                        <p key={index}>
                                            {history.status}
                                            {" — "}
                                            {new Date(
                                                history.changedAt
                                            ).toLocaleString()}
                                        </p>

                                    )
                                )}

                            </div>
                        )}

                </div>
            )}

            <button
                type="button"
                onClick={() =>
                    onEditApplication(application)
                }
            >
                Edit
            </button>

            <button
                type="button"
                onClick={() => {

                    const confirmed =
                        window.confirm(
                            `Are you sure you want to delete the application for ${application.company}?`
                        )

                    if (confirmed) {
                        onDeleteApplication(
                            application.id
                        )
                    }

                }}
            >
                Delete
            </button>

            <button
                type="button"
                onClick={() =>
                    onDuplicateApplication(
                        application
                    )
                }
            >
                Duplicate
            </button>

        </div>
    )
}

export default ApplicationCard