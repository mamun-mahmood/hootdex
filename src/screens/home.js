import TopPools from "../components/Tables/TopPools";
import Transactions from "../components/Tables/Transactions";
import TopToken from "../components/Tables/TopToken";
import PecuGraph from "../components/Graphs/PecuGraph";
export default function Home() {
  return (
    <>
      <div
        className="screen"
        style={{
          zIndex: "100",
          position: "sticky",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <PecuGraph />
        {/* <h1 className="primary__title">Listed Tokens</h1> */}
        <div
          style={{
            width: "80%",
          }}
        >
          <TopToken />
          <TopPools />
          <Transactions />
        </div>
      </div>
    </>
  );
}
