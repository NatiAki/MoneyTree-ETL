class CSVFile {
    constuctor() {
    }

    normalizeDate(monthOrDay) {

        if (monthOrDay.length == 1) {
            return ("0" + monthOrDay)
        }
        return monthOrDay;
    }

    firstCharToUpperCase(data) {
        return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }

    formatData(input, startDate, endDate) {
        input.forEach(element => {
            element.amount = element.amount.replace(/,/g, '');

            let fromDate = startDate.split('-');
            let toDate = endDate.split('-');
            let splitDate = element.date.split('-');

            let formatedDate;
            let year;

            if (fromDate[0] == splitDate[1]) {
                year = fromDate[0];
            } else {
                year = toDate[0];
            }

            formatedDate = year + "-" + this.normalizeDate(splitDate[1]) + "-" + this.normalizeDate(splitDate[0]);

            element.date = formatedDate;
            element.description = "'" + element.description + "'";
        });

        return input;
    }


    jsonToCsv(jsonData) {
        let csv = '';

        const headers = Object.keys(jsonData[0]);
        csv = this.firstCharToUpperCase(headers[1]) + "," + this.firstCharToUpperCase(headers[0]) + "," + this.firstCharToUpperCase(headers[2]) + "\n";

        jsonData.forEach(obj => {
            const values = headers.map(header => obj[header]);
            csv += values[1] + "," + values[0] + "," + values[2] + '\n';
        });

        return csv;
    }

    downloadCSV(csvData, filename = 'outputData.csv') {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
