import type { UserRole } from '../../features/auth/roleTypes';

type RoleSelectionProps = {
  onSelectRole: (role: Exclude<UserRole, null>) => void;
};

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <main className="role-screen">
      <section className="role-card">
        <span className="hud-label">RealLabVerse Access</span>
        <h1>Select Login Role</h1>
        <p>Choose how you want to enter the Phase 1 training environment.</p>
        <div className="role-actions">
          <button type="button" onClick={() => onSelectRole('student')}>
            Student
          </button>
          <button type="button" onClick={() => onSelectRole('teacher')}>
            Teacher
          </button>
        </div>
      </section>
    </main>
  );
}

