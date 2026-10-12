import ApplicationCard from "./ApplicationCard"

function ApplicationList({
    applications,
    onDeleteApplication,
    onEditApplication,
    onClearAll,
    onStatusChange,
    onDuplicateApplication
}) {

    return (
        <section className="application-list">

            <h2>Applications</h2>

            <button onClick={onClearAll}>
                Clear All
            </button>

            {applications.length === 0 ? (
                <p>
                    No applications found.
                </p>
            ) : (
                applications.map((application) => (

                    <ApplicationCard
                        key={application.id}
                        application={application}
                        onDeleteApplication={
                            onDeleteApplication
                        }
                        onEditApplication={
                            onEditApplication
                        }
                        onStatusChange={
                            onStatusChange
                        }
                        onDuplicateApplication={
                            onDuplicateApplication
                        }
                    />

                ))
            )}

        </section>
    )
}

export default ApplicationList