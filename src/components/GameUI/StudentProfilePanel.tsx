import type { SavedTrainingData } from '../../features/experiments/trainingSave';
import type { UserRole } from '../../features/auth/roleTypes';

type StudentProfilePanelProps = {
  savedData: SavedTrainingData;
  onSwitchRole: (role: UserRole) => void;
};

export function StudentProfilePanel({ savedData, onSwitchRole }: StudentProfilePanelProps) {
  return (
    <section className="student-profile-panel" aria-label="Student profile">
      <div>
        <span className="hud-label">Student</span>
        <strong>{savedData.profile.name}</strong>
      </div>
      <div>
        <span className="hud-label">Institute</span>
        <strong>{savedData.profile.institute}</strong>
      </div>
      <div>
        <span className="hud-label">Department</span>
        <strong>{savedData.profile.department}</strong>
      </div>
      <div>
        <span className="hud-label">Level</span>
        <strong>{savedData.level}</strong>
      </div>
      <div>
        <span className="hud-label">XP</span>
        <strong>{savedData.xp}</strong>
      </div>
      <div>
        <span className="hud-label">Certifications</span>
        <strong>
          {savedData.certifications.length
            ? savedData.certifications.map((certificate) => certificate.trainingName).join(', ')
            : 'None yet'}
        </strong>
      </div>
      <button type="button" onClick={() => onSwitchRole(null)}>
        Switch Role
      </button>
    </section>
  );
}
