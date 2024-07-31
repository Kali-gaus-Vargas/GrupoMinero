document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    // Aquí puedes ajustar las credenciales según sea necesario
    const validUsername = 'admin';
    const validPassword = 'admin';

    if (username === validUsername && password === validPassword) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('menu').style.display = 'block';
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
    }
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function sortData() {
    const dataInput1 = document.getElementById('dataInput1').value;
    const dataInput2 = document.getElementById('dataInput2').value;

    const dataArray1 = dataInput1.split('\n').map(item => item.trim());
    const dataArray2 = dataInput2.split('\n').map(item => item.trim());

    const dataSet1 = new Set(dataArray1.map(item => item));
    const dataSet2 = new Set(dataArray2.map(item => item.slice(4))); // Eliminar los primeros 4 caracteres

    const missingInArray2 = [...dataSet1].filter(item => !dataSet2.has(item));
    const missingInArray1 = [...dataSet2].filter(item => !dataSet1.has(item));

    let resultHtml = '<table id="result-table"><tr><th>Documento Material</th><th>Lista por Comparar</th></tr>';

    dataArray1.forEach((item1) => {
        const matchedItem = dataArray2.find(item2 => item2.slice(4) === item1) || '';
        resultHtml += `<tr><td class="${matchedItem ? 'match' : 'mismatch'}">${item1}</td><td class="${matchedItem ? 'match' : 'mismatch'}">${matchedItem || ''}</td></tr>`;
    });
    resultHtml += '</table>';

    let summaryHtml = '<h2>Resumen:</h2>';
    if (missingInArray2.length > 0) {
        summaryHtml += '<p>Faltan en la Lista por Comparar: <span class="mismatch">' + missingInArray2.join(', ') + '</span></p>';
    }
    if (missingInArray1.length > 0) {
        summaryHtml += '<p>Faltan en el Documento Material: <span class="mismatch">' + missingInArray1.join(', ') + '</span></p>';
    }
    if (missingInArray2.length === 0 && missingInArray1.length === 0) {
        summaryHtml += '<p><span class="match">¡Todas las coincidencias están completas! ¡Todo coincide!</span></p>';
    }

    document.getElementById('result').innerHTML = resultHtml + summaryHtml;
    document.getElementById('downloadCsvBtn').style.display = 'block';
}

function verifyData() {
    const verifierInput1 = document.getElementById('verifierInput1').value;
    const verifierInput2 = document.getElementById('verifierInput2').value;

    const verifierArray1 = verifierInput1.split('\n').map(item => item.trim());
    const verifierArray2 = verifierInput2.split('\n').map(item => item.trim().slice(2));

    const missingInArray2 = verifierArray1.filter(item => !verifierArray2.includes(item));
    const missingInArray1 = verifierArray2.filter(item => !verifierArray1.includes(item));

    let resultHtml = '<table id="result-table"><tr><th>Datos sin prefijo</th><th>Remisión con prefijo</th></tr>';

    verifierArray1.forEach((item1) => {
        const matchedItem = verifierArray2.find(item2 => item2 === item1) || '';
        resultHtml += `<tr><td class="${matchedItem ? 'match' : 'mismatch'}">${item1}</td><td class="${matchedItem ? 'match' : 'mismatch'}">${matchedItem || ''}</td></tr>`;
    });
    resultHtml += '</table>';

    let summaryHtml = '<h2>Resumen:</h2>';
    if (missingInArray2.length > 0) {
        summaryHtml += '<p>Faltan en la Remisión con prefijo: <span class="mismatch">' + missingInArray2.join(', ') + '</span></p>';
    }
    if (missingInArray1.length > 0) {
        summaryHtml += '<p>Faltan en los Datos sin prefijo: <span class="mismatch">' + missingInArray1.join(', ') + '</span></p>';
    }
    if (missingInArray2.length === 0 && missingInArray1.length === 0) {
        summaryHtml += '<p><span class="match">¡Todas las coincidencias están completas! ¡Todo coincide!</span></p>';
    }

    document.getElementById('verifierResult').innerHTML = resultHtml + summaryHtml;
    document.getElementById('verifierDownloadCsvBtn').style.display = 'block';
}

function ignore7Data() {
    const ignore7Input1 = document.getElementById('ignore7Input1').value;
    const ignore7Input2 = document.getElementById('ignore7Input2').value;

    const ignore7Array1 = ignore7Input1.split('\n').map(item => item.trim());
    const ignore7Array2 = ignore7Input2.split('\n').map(item => item.trim().slice(5));

    const missingInArray2 = ignore7Array1.filter(item => !ignore7Array2.includes(item));
    const missingInArray1 = ignore7Array2.filter(item => !ignore7Array1.includes(item));

    let resultHtml = '<table id="result-table"><tr><th>Datos sin dígitos</th><th>Datos con dígitos a eliminar</th></tr>';

    ignore7Array1.forEach((item1) => {
        const matchedItem = ignore7Array2.find(item2 => item2 === item1) || '';
        resultHtml += `<tr><td class="${matchedItem ? 'match' : 'mismatch'}">${item1}</td><td class="${matchedItem ? 'match' : 'mismatch'}">${matchedItem || ''}</td></tr>`;
    });
    resultHtml += '</table>';

    let summaryHtml = '<h2>Resumen:</h2>';
    if (missingInArray2.length > 0) {
        summaryHtml += '<p>Faltan en los Datos con dígitos a eliminar: <span class="mismatch">' + missingInArray2.join(', ') + '</span></p>';
    }
    if (missingInArray1.length > 0) {
        summaryHtml += '<p>Faltan en los Datos sin dígitos: <span class="mismatch">' + missingInArray1.join(', ') + '</span></p>';
    }
    if (missingInArray2.length === 0 && missingInArray1.length === 0) {
        summaryHtml += '<p><span class="match">¡Todas las coincidencias están completas! ¡Todo coincide!</span></p>';
    }

    document.getElementById('ignore7Result').innerHTML = resultHtml + summaryHtml;
    document.getElementById('ignore7DownloadCsvBtn').style.display = 'block';
}

function downloadCsv(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    let csvContent = '';

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let rowData = [];
        for (let cell of cells) {
            rowData.push(cell.textContent);
        }
        csvContent += rowData.join(',') + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tableId}.csv`;
    link.click();
}
