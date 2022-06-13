import Tier0Dashboard from '../components/dashboard/Tier0Dashboard';
import Tier1Dashboard from '../components/dashboard/Tier1Dashboard';
import Tier2Dashboard from '../components/dashboard/Tier2Dashboard';

const DashboardIndex = ({user}) => {
  let tier = 2;
  return (
    <div>
      {/* showing dashboard based on user tier level */}
      {tier === 0 && <Tier0Dashboard user={user} />}
      {tier === 1 && <Tier1Dashboard user={user} />}
      {tier === 2 && <Tier2Dashboard user={user} />}
    </div>
  );
};

export default DashboardIndex;