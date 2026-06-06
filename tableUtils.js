function getTableData(tableEl) {
    const headers = Array.from(tableEl.querySelectorAll('thead th')).map(th => th.textContent.trim());
    const rows = Array.from(tableEl.querySelectorAll('tbody tr')).map(tr => {
        return Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
    });
    return { headers, rows };
}

function toMarkdownKeyValue(headers, rows) {
    return rows.map((row, rowIndex) => {
        const lines = headers.map((header, index) => `- ${header}: ${row[index] || ''}`).join('\n');
        return `Row ${rowIndex + 1}:\n${lines}`;
    }).join('\n\n');
}

function toMarkdownTable(headers, rows) {
    const headerLine = '| ' + headers.join(' | ') + ' |';
    const delimiterLine = '| ' + headers.map(() => '---').join(' | ') + ' |';
    const rowLines = rows.map(row => '| ' + row.join(' | ') + ' |');
    return [headerLine, delimiterLine, ...rowLines].join('\n');
}

function injectTableButtons() {
    const tables = document.querySelectorAll('.table-block:not(.custom-buttons-added)');
    tables.forEach(tableBlock => {
        tableBlock.classList.add('custom-buttons-added');
        const footer = tableBlock.querySelector('.table-footer');
        if (!footer) return;

        const btnContainer = document.createElement('div');
        btnContainer.className = 'custom-copy-buttons-container';

        const kvBtn = document.createElement('button');
        kvBtn.className = 'gemini-custom-copy-btn';
        kvBtn.textContent = 'Copy KV';
        kvBtn.addEventListener('click', () => {
            const table = tableBlock.querySelector('table');
            if (!table) return;
            const { headers, rows } = getTableData(table);
            navigator.clipboard.writeText(toMarkdownKeyValue(headers, rows));
        });

        const mdBtn = document.createElement('button');
        mdBtn.className = 'gemini-custom-copy-btn';
        mdBtn.textContent = 'Copy Table';
        mdBtn.addEventListener('click', () => {
            const table = tableBlock.querySelector('table');
            if (!table) return;
            const { headers, rows } = getTableData(table);
            navigator.clipboard.writeText(toMarkdownTable(headers, rows));
        });

        btnContainer.appendChild(kvBtn);
        btnContainer.appendChild(mdBtn);
        footer.appendChild(btnContainer);
    });
}