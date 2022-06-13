import Tier0Dashboard from '../components/dashboard/Tier0Dashboard';
import Tier1Dashboard from '../components/dashboard/Tier1Dashboard';

const DashboardIndex = ({user}) => {
  let tier = 1;
  return (
    <div>
      {/* showing dashboard based on user tier level */}
      {tier === 0 && <Tier0Dashboard user={user} />}
      {tier === 1 && <Tier1Dashboard user={user} />}
      
    </div>
  );
};

export default DashboardIndex;