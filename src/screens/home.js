import PoolTokens from "../components/Tables/PoolTokens";
import WarpTokens from "../components/Tables/WarpTokens";
import Chart from "./chart";
export default function Home() {
  // const handleSubmit = (e) => {
  // e.preventDefault();
  // if (searchKey) {
  //   fetchToken(searchKey);
  // } else fetchToken("all");
  // };
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
        {/* <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <form className="form-control" onSubmit={handleSubmit}>
            <input
              style={{
                width: "30rem",
                height: "1rem",
              }}
              className="border inputField shadow"
              type="text"
              placeholder="Search for token..."
              name="searchKey"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </form>
        </div> */}
        <div
          style={{
            width: "80%",
          }}
        >
          <WarpTokens />
          <PoolTokens />
        </div>
      </div>
    </>
  );
}
