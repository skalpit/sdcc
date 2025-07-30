class PlayHQIntegration {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.playhq.com/v1/';
    }

    // Fetch upcoming matches
    async fetchUpcomingMatches(limit = null) {
        try {
            // This is a placeholder - adjust based on PlayHQ API docs
            const response = await fetch(`${this.baseUrl}matches/upcoming`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return limit ? data.slice(0, limit) : data;
        } catch (error) {
            console.error('Error fetching matches:', error);
            return this.getMockMatches(limit);
        }
    }

    // Fetch player statistics
    async fetchPlayerStats(grade) {
        try {
            const response = await fetch(`${this.baseUrl}statistics/${grade}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            return this.getMockStats(grade);
        }
    }

    // Mock data for development
    getMockMatches(limit = null) {
        const matches = [
            {
                id: 1,
                homeTeam: 'Southern District CC',
                awayTeam: 'Darwin CC',
                date: '2025-06-07',
                time: '9:00 AM',
                venue: 'Marrara Cricket Ground',
                grade: 'A Grade',
                category: 'mens'
            },
            {
                id: 2,
                homeTeam: 'Palmerston CC',
                awayTeam: 'Southern District CC',
                date: '2025-06-14',
                time: '1:00 PM',
                venue: 'Palmerston Recreation Ground',
                grade: 'B Grade',
                category: 'mens'
            },
            {
                id: 3,
                homeTeam: 'Southern District CC',
                awayTeam: 'Nightcliff CC',
                date: '2025-06-21',
                time: '9:00 AM',
                venue: 'Marrara Cricket Ground',
                grade: 'Women\'s Premier',
                category: 'womens'
            },
            {
                id: 4,
                homeTeam: 'Tracy Village CC',
                awayTeam: 'Southern District CC',
                date: '2025-06-28',
                time: '2:00 PM',
                venue: 'Tracy Village Oval',
                grade: 'Under 16',
                category: 'junior'
            },
            {
                id: 5,
                homeTeam: 'Southern District CC',
                awayTeam: 'Waratah CC',
                date: '2025-07-05',
                time: '10:00 AM',
                venue: 'Marrara Cricket Ground',
                grade: 'C Grade',
                category: 'mens'
            }
        ];
        return limit ? matches.slice(0, limit) : matches;
    }

    getMockStats(grade) {
        const mockData = {
            mens: {
                batting: [
                    { name: 'Jake Smith', runs: 342, average: 42.8 },
                    { name: 'Michael Johnson', runs: 289, average: 36.1 },
                    { name: 'David Wilson', runs: 256, average: 32.0 }
                ],
                bowling: [
                    { name: 'Tom Brown', wickets: 18, average: 12.3 },
                    { name: 'Alex Wilson', wickets: 15, average: 15.2 },
                    { name: 'Peter Johnson', wickets: 12, average: 18.7 }
                ]
            },
            womens: {
                batting: [
                    { name: 'Sarah Thompson', runs: 245, average: 40.8 },
                    { name: 'Emma Davis', runs: 198, average: 33.0 },
                    { name: 'Lisa Wilson', runs: 167, average: 27.8 }
                ],
                bowling: [
                    { name: 'Kate Brown', wickets: 14, average: 11.2 },
                    { name: 'Amy Smith', wickets: 11, average: 14.5 },
                    { name: 'Jess Taylor', wickets: 9, average: 16.8 }
                ]
            },
            junior: {
                batting: [
                    { name: 'Billy Mitchell', runs: 189, average: 31.5 },
                    { name: 'Sam Johnson', runs: 156, average: 26.0 },
                    { name: 'Luke Davis', runs: 134, average: 22.3 }
                ],
                bowling: [
                    { name: 'Josh Wilson', wickets: 12, average: 9.8 },
                    { name: 'Ryan Brown', wickets: 10, average: 12.1 },
                    { name: 'Tyler Smith', wickets: 8, average: 15.3 }
                ]
            }
        };
        return mockData[grade] || mockData.mens;
    }
}