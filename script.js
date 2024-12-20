async function fetchIPInfo() {
    const token = "9e2933a6ffa193"; 
    const ipInput = document.getElementById("ipInput").value.trim();
    const url = ipInput 
        ? `https://api.allorigins.win/get?url=${encodeURIComponent(`https://ipinfo.io/${ipInput}/json?token=${token}`)}`
        : `https://api.allorigins.win/get?url=${encodeURIComponent(`https://ipinfo.io/json?token=${token}`)}`;

    const loading = document.getElementById("loading");
    const table = document.getElementById("ipInfoTable");
    const tbody = document.getElementById("ipInfoBody");

    try {
        loading.style.display = "block";
        table.style.display = "none";

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao buscar informações do IP.");
        }
        
        const result = await response.json();
        const data = JSON.parse(result.contents); // Decodifica os dados JSON retornados pelo proxy

        tbody.innerHTML = ""; 

        for (const [key, value] of Object.entries(data)) {
            const row = document.createElement("tr");
            const keyCell = document.createElement("td");
            const valueCell = document.createElement("td");

            keyCell.textContent = key;
            valueCell.textContent = value || "N/A";

            row.appendChild(keyCell);
            row.appendChild(valueCell);
            tbody.appendChild(row);
        }

        table.style.display = "table";
    } catch (error) {
        alert("Erro: " + error.message);
    } finally {
        loading.style.display = "none";
    }
}

