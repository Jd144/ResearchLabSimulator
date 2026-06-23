import type { SavedTrainingData } from '../../features/experiments/trainingSave';
import type { UserRole } from '../../features/auth/roleTypes';

type TeacherDashboardProps = {
  savedData: SavedTrainingData;
  onSwitchRole: (role: UserRole) => void;
};

export function TeacherDashboard({ savedData, onSwitchRole }: TeacherDashboardProps) {
  const latestAttempt = savedData.attempts[savedData.attempts.length - 1];
  const safetyScore = latestAttempt?.safetyScore ?? 100;
  const certificationStatus = savedData.certifications.length ? 'Certified' : 'Pending';

  return (
    <main className="dashboard-screen">
      <section className="dashboard-header">
        <div>
          <span className="hud-label">Teacher Dashboard</span>
          <h1>Intern Training Monitor</h1>
        </div>
        <button type="button" onClick={() => onSwitchRole(null)}>
          Switch Role
        </button>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <span className="hud-label">All Students</span>
          <h2>{savedData.profile.name}</h2>
          <p>{savedData.profile.institute}</p>
          <p>{savedData.profile.department}</p>
          <p>Level: {savedData.level}</p>
          <p>XP: {savedData.xp}</p>
        </article>

        <article className="dashboard-card">
          <span className="hud-label">Training Status</span>
          <p>Completed Trainings: {savedData.completedTraining.length}</p>
          <p>Safety Score: {safetyScore}%</p>
          <p>Certification: {certificationStatus}</p>
        </article>

        <article className="dashboard-card wide">
          <span className="hud-label">Student Training Report</span>
          {latestAttempt ? (
            <>
              <p>Training completed: {latestAttempt.completed ? 'Yes' : 'No'}</p>
              <p>Attempts: {savedData.attempts.length}</p>
              <p>Score: {latestAttempt.score}%</p>
              <p>Safety score: {latestAttempt.safetyScore}%</p>
              <p>Time spent: {formatTime(latestAttempt.timeSpentSeconds)}</p>
              <p>Common mistakes: {latestAttempt.commonMistakes.join(', ')}</p>
            </>
          ) : (
            <p>No attempts recorded yet.</p>
          )}
        </article>

        <article className="dashboard-card wide">
          <span className="hud-label">Certification Verification</span>
          {savedData.certifications.length ? (
            savedData.certifications.map((certificate) => (
              <div className="dashboard-list-item" key={certificate.certificateId}>
                <p>Certificate ID: {certificate.certificateId}</p>
                <p>Completion date: {certificate.completionDate}</p>
                <p>Training name: {certificate.trainingName}</p>
              </div>
            ))
          ) : (
            <p>No certificate issued yet.</p>
          )}
        </article>

        <article className="dashboard-card wide">
          <span className="hud-label">Notebook Entries</span>
          {savedData.notebookEntries.length ? (
            savedData.notebookEntries.map((entry, index) => (
              <div className="dashboard-list-item" key={`${entry.date}-${index}`}>
                <p>{entry.date}: {entry.experiment}</p>
                <p>Materials: {entry.materials.join(', ')}</p>
                <p>Result: {entry.result}</p>
              </div>
            ))
          ) : (
            <p>No notebook entries yet.</p>
          )}
        </article>

        <article className="dashboard-card wide">
          <span className="hud-label">Mistakes Report</span>
          {savedData.attempts.length ? (
            savedData.attempts.map((attempt) => (
              <div className="dashboard-list-item" key={attempt.id}>
                <p>{attempt.trainingName}</p>
                <p>{attempt.commonMistakes.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>No mistakes recorded yet.</p>
          )}
        </article>
      </section>
    </main>
  );
}

function formatTime(seconds: number) {
  if (!seconds) return '0s';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return minutes ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
}

