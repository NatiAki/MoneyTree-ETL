class APIService {
    constructor(baseURL) {
        this.baseURL = BASE_URL;
    }

    async getData(endpoint, startDate, endDate) {
        const apiUrl = `${this.baseURL}${endpoint}/?fromDate=${startDate}&toDate=${endDate}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                if (response.status == 400) {
                    return "Too many transactions! \nPlease provide a smaller range";
                } else {
                    return `Status code : ${response.status}`
                }

            }

            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    }
}


// The BASE_URL is in a file that is in .gitignore for security reasons.
// There are some returns that are providing data outside of the expected range. For example, when I search for data from 2023-12-29 to 2024-01-30, it returns data from 2023-11-29.
// I believe that the data is incorrectly returning the month as -1. When I search for month 01 (January), it returns data like 10-0 instead of 01.
// To correct this issue, I need would need to talk to who made the API
// I couldn't access the API directly through my browser due to CORS policy. I used an extension in the browser to bypass this limitation, but the correct approach would have been to ask them to add my address to the API so that I could access it directly.
