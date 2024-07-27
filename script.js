document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    // Aquí puedes ajustar las credenciales según sea necesario
    const validUsername = 'admin';
    const validPassword = 'password123';

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
        summaryHtml += '<p>¡Todas las coincidencias están completas! <span class="match">¡Todo coincide!</span></p>';
    }

    document.getElementById('result').innerHTML = resultHtml + summaryHtml;
}

function verifyData() {
    const verifierInput1 = document.getElementById('verifierInput1').value;
    const verifierInput2 = document.getElementById('verifierInput2').value;

    // Obtener datos sin prefijo (no se elimina prefijo)
    const dataArray1 = verifierInput1.split('\n').map(item => item.trim());
    // Obtener datos con prefijo (se elimina prefijo)
    const dataArray2 = verifierInput2.split('\n').map(item => item.trim().slice(2)); // Eliminar los primeros 2 caracteres (prefijo)

    const dataSet1 = new Set(dataArray1); // Conjunto de datos sin prefijo
    const dataSet2 = new Set(dataArray2); // Conjunto de datos con prefijo (sin prefijo)

    const missingInArray2 = [...dataSet1].filter(item => !dataSet2.has(item));
    const missingInArray1 = [...dataSet2].filter(item => !dataSet1.has(item));

    let resultHtml = '<table id="result-table"><tr><th>Datos sin Prefijo</th><th>Remisión con Prefijo</th></tr>';

    dataArray1.forEach((item1) => {
        const matchedItem = dataArray2.find(item2 => item2 === item1) || '';
        resultHtml += `<tr><td class="${matchedItem ? 'match' : 'mismatch'}">${item1}</td><td class="${matchedItem ? 'match' : 'mismatch'}">${matchedItem ? 'R/' + matchedItem : ''}</td></tr>`;
    });
    resultHtml += '</table>';

    let summaryHtml = '<h2>Resumen:</h2>';
    if (missingInArray2.length > 0) {
        summaryHtml += '<p>Faltan en la Remisión con Prefijo: <span class="mismatch">' + missingInArray2.join(', ') + '</span></p>';
    }
    if (missingInArray1.length > 0) {
        summaryHtml += '<p>Faltan en los Datos sin Prefijo: <span class="mismatch">' + missingInArray1.join(', ') + '</span></p>';
    }
    if (missingInArray2.length === 0 && missingInArray1.length === 0) {
        summaryHtml += '<p>¡Todas las coincidencias están completas! <span class="match">¡Todo coincide!</span></p>';
    }

    document.getElementById('verifierResult').innerHTML = resultHtml + summaryHtml;
}
