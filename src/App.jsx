import { useState } from "react";
import jsPDF from "jspdf";


export default function App() {
  const [zakaznik, setZakaznik] = useState("");
  const [popis, setPopis] = useState("");
  const [material, setMaterial] = useState("");
  const [prace, setPrace] = useState("");

  const cisloNabidky = "N-" + Date.now();

  const celkem =
    (Number(material) || 0) +
    (Number(prace) || 0);

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("CENOVA NABIDKA", 20, 20);

    doc.setFontSize(11);

    doc.text(`Cislo nabidky: ${cisloNabidky}`, 20, 35);

    doc.text(
      `Datum: ${new Date().toLocaleDateString()}`,
      20,
      45
    );

    doc.text(`Zakaznik: ${zakaznik}`, 20, 60);

    doc.text("Popis zakazky:", 20, 75);

    const text = doc.splitTextToSize(popis, 160);
    doc.text(text, 20, 85);

    doc.text(`Material: ${material} Kc`, 20, 130);
    doc.text(`Prace: ${prace} Kc`, 20, 145);

    doc.setFontSize(16);
    doc.text(`CELKEM: ${celkem} Kc`, 20, 170);

    doc.save(`nabidka-${cisloNabidky}.pdf`);
  };

  return (
    <div
      style={{
        background: "#eef2ff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            color: "#1e3a8a",
            marginBottom: "30px",
          }}
        >
          AI Nabídka PRO
        </h1>

        <p>
          Číslo nabídky:
          <strong> {cisloNabidky}</strong>
        </p>

        <input
          placeholder="Jméno zákazníka"
          value={zakaznik}
          onChange={(e) =>
            setZakaznik(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <textarea
          placeholder="Popis zakázky"
          value={popis}
          onChange={(e) =>
            setPopis(e.target.value)
          }
          rows="5"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="number"
          placeholder="Cena materiálu"
          value={material}
          onChange={(e) =>
            setMaterial(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="number"
          placeholder="Cena práce"
          value={prace}
          onChange={(e) =>
            setPrace(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <div
          style={{
            background: "#dcfce7",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h2>Celkem: {celkem} Kč</h2>
        </div>

        <button
          onClick={generatePdf}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          📄 Stáhnout PDF
        </button>
      </div>
    </div>
  );
}