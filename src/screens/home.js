import PoolTokens from '../components/Tables/PoolTokens';
import Transactions from '../components/Tables/Transactions';
import WarpTokens from '../components/Tables/WarpTokens';
import Chart from './chart';
export default function Home() {
  return (
    <>
      <div
        className="screen"
        style={{
          zIndex: '100',
          position: 'sticky',
          width: '100%',
          marginBottom: '1rem'
        }}
      >
        <Chart />
        {/* <h1 className="primary__title">Listed Tokens</h1> */}
        <div
          style={{
            width: '80%'
          }}
        >
          <WarpTokens />
          <PoolTokens />
          <Transactions />
        </div>
      </div>
    </>
  );
}
