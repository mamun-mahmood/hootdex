import Tier0Dashboard from '../components/dashboard/Tier0Dashboard';

const DashboardIndex = ({user}) => {
  let tier = 0;
  return (
    <div>
      {/* showing dashboard based on user tier level */}
      {tier === 0 && <Tier0Dashboard user={user} />}
      
    </div>
  );
};

export default DashboardIndex;