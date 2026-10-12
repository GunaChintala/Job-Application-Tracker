import StatCard from './StatCard'

function Dashboard({ applications }) {

    const totalApplications =
        applications.length

    const appliedCount =
        applications.filter(
            (application) =>
                application.status === "Applied"
        ).length

    const interviewCount =
        applications.filter(
            (application) =>
                application.status === "Interview"
        ).length

    const rejectedCount =
        applications.filter(
            (application) =>
                application.status === "Rejected"
        ).length

    const offerCount =
        applications.filter(
            (application) =>
                application.status === "Offer"
        ).length

    const interviewRate =
        totalApplications === 0
            ? 0
            : (
                (interviewCount /
                    totalApplications) *
                100
            ).toFixed(1)

    const rejectionRate =
        totalApplications === 0
            ? 0
            : (
                (rejectedCount /
                    totalApplications) *
                100
            ).toFixed(1)

    const offerRate =
        totalApplications === 0
            ? 0
            : (
                (offerCount /
                    totalApplications) *
                100
            ).toFixed(1)

    return (
        <section>

            <h2>Dashboard</h2>

            <div className="dashboard">

                <StatCard
                    title="Total Applications"
                    value={totalApplications}
                />

                <StatCard
                    title="Applied"
                    value={appliedCount}
                />

                <StatCard
                    title="Interview"
                    value={interviewCount}
                />

                <StatCard
                    title="Rejected"
                    value={rejectedCount}
                />

                <StatCard
                    title="Offers"
                    value={offerCount}
                />

                <StatCard
                    title="Interview Rate"
                    value={`${interviewRate}%`}
                />

                <StatCard
                    title="Rejection Rate"
                    value={`${rejectionRate}%`}
                />

                <StatCard
                    title="Offer Rate"
                    value={`${offerRate}%`}
                />

            </div>

        </section>
    )
}

export default Dashboard