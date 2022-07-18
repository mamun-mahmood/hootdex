import PoolTokens from "../components/Tables/PoolTokens";
import WarpTokens from "../components/Tables/WarpTokens";
import Chart from "./chart";
export default function Home() {
  return (
    <>
      <div
        className="screen"
        style={{ zIndex: "100", position: "sticky", width: "100%", marginBottom: '1rem' }}
      >
        {/* <div className="banner-hero" >   <h1 className="primary__title">Available Pools</h1>
    <p style={{color:'orange'}}>Swap, earn, and build on the leading decentralized crypto trading protocol.</p>
    </div> */}
        <Chart />
        {/* <h1 className="primary__title">Listed Tokens</h1> */}
        <div
          style={{
            width: "80%",
          }}
        >
          {/* <WarpTokens /> */}
          <PoolTokens />
        </div>
      </div>
    </>
  );
}
