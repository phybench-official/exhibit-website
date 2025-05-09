import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LeaderboardData from "@/components/LeaderboardData.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Leaderboard = () => {
  const chartData = {
    labels: LeaderboardData.map((row) => row.model),
    datasets: [
      {
        label: "EED Score",
        data: LeaderboardData.map((row) => row.eed),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <br />
      <br />
      <section className="section">
        <div className="container is-max-desktop">
          <h2 className="title is-2 has-text-centered">Leaderboard</h2>
          <p
            className="subtitle is-5 has-text-justified"
            style={{ fontSize: "1.25rem", lineHeight: "1.6" }}
          >
            <br />
            This leaderboard includes the performance of various models on the
            PHYBench benchmark, showcasing their abilities in physical
            understanding and reasoning. The ranking is based on the EED score,
            listed from highest to lowest, with sub-scores covering six modules:
            Mechanics, Electromagnetism, Thermodynamics, Optics, Modern Physics,
            and Advanced Physics (theoretical mechanics, electrodynamics,
            statistical mechanics, quantum mechanics).
            <br />
            For testing inquiries, please contact our official email:
            contact@phybench.cn.
          </p>

          <div
            style={{
              marginBottom: "20px",
              textAlign: "center",
              minWidth: "1000px",
              minHeight: "500px",
            }}
          >
            <Bar
              data={chartData}
              options={{
                responsive: true,
              }}
            />
          </div>

          <div className="table-container" style={{ overflowX: "auto" }}>
            <table
              className="table is-striped is-hoverable is-fullwidth"
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f4f4f4",
                    fontWeight: "bold",
                  }}
                >
                  <th style={{ textAlign: "center" }}>Rank</th>
                  <th style={{ textAlign: "center" }}>Model</th>
                  <th style={{ textAlign: "center" }}>Accuracy</th>
                  <th style={{ textAlign: "center" }}>EED Score</th>
                  <th style={{ textAlign: "center" }}>Mech.</th>
                  <th style={{ textAlign: "center" }}>Elec.</th>
                  <th style={{ textAlign: "center" }}>Thmo.</th>
                  <th style={{ textAlign: "center" }}>Opt.</th>
                  <th style={{ textAlign: "center" }}>Mod.</th>
                  <th style={{ textAlign: "center" }}>Adv.</th>
                  <th style={{ textAlign: "center" }}>Organization</th>
                </tr>
              </thead>
              <tbody>
                {LeaderboardData.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#fafafa" : "white",
                    }}
                  >
                    <td>{row.rank}</td>
                    <td>{row.model}</td>
                    <td>{row.accuracy}</td>
                    <td>{row.eed}</td>
                    <td>{row.mech}</td>
                    <td>{row.elec}</td>
                    <td>{row.thmo}</td>
                    <td>{row.opt}</td>
                    <td>{row.mod}</td>
                    <td>{row.adv}</td>
                    <td>{row.org}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
