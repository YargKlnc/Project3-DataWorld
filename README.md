# Tech Career Analytics and Insights Hub
## Highest Paying Countries, Highest Salary Experience Levels and much more.
### Use the interactive charts below to explore the dataset, explore salary trends and make informed decisions.
#### This tool is designed to empower you with valuable insights for strategic decisions in global job seeking, hiring, global HR strategies.

![image](https://github.com/YargKlnc/Project3-DataWorld/assets/142269763/c3fd3e07-eedc-4dc3-ad61-feab30eff45b)

**Project 3 - Group 1 by Ismail Omer, Yargi Kilinc, Archit Hallan, Tania Barrera**

We are delighted to present Project 3, a comprehensive exploration tailored for employers, job seekers in the data realm, individuals contemplating joining a bootcamp, and esteemed global HR companies.

Our sophisticated visuals provide profound insights:

**By Selecting COUNTRY from Dropdown1**

1.	a horizontal bar chart that displays the top 10 highest-paying job titles 

> **API route:** `/api/v1.0/country/<country_name>/top10_job_titles`
> 
> **If you want all job titles instead of only top10:** `/api/v1.0/country/<country_name>/all_job_titles`

2.	an interactive Map displaying total number of all job titles with a popup marker

> **API route:** `/api/v1.0/country/<country_name>/job_title_counts`

**By Selecting JOB TITLE from Dropdown2**

3.	a line graph that displays the top 10 highest paying countries

> **API route:** `/api/v1.0/job_title/<job_title>/top10_countries`

4.	an interactive bubble map that displays the top 10 highest paying countries,

> **API route:** `/api/v1.0/job_title/<job_title>/top10_countries`
> 
> **If you want all countries instead of only top 10:** `/api/v1.0/job_title/<job_title>/all_countries`

**By Selecting EXPERIENCE LEVEL from Dropdown3**

5.	a line graph that displays Top10 highest paying countries for that experience level 

> **API route:** `/api/v1.0/experience_level/<experience_level_name>/top10_countries`

6.	an interactive bubble map that displays the salaries for the experience level selected for all countries 

> **API route:** `/api/v1.0/experience_level/<experience_level_name>/all_countries`

## How to

To visualize the dashboard, clone the repository into your machine and run the app.py flask application using `python app.py` from Terminal. The Home page (i.e. `/`) will display the dashboard.

Additionaly, you can access the API via this same application. For route explanation go to the `/api/v1.0/` page or see API routes below.

### Python dependencies

You will need to have installed the following python packages:

- `flask`

- `pandas`

- `numpy`

- `sqlalchemy`

- `sqlalchemy_utils`

- `psycopg2`

### API routes

#### Static: To access the whole dataset

Our API has a static route that returns all the individual data points, along with the distinct values present in the dataset for the `Company Location`, `Job Title`, `Expertise Level` columns.

To access this route, follow this relative route after stating your local server: `/api/v1.0/salaries`

The returned data is in json format and follows this structure:

```json

{
    "Company Location": [
        "Canada",
        "Germany",
        ...
    ],
    "Data": [{
            "Company Location": "Canada",
            "Company Size": "Large",
            "Employment Type": "Contract",
            "Expertise Level": "Junior",
            "Job Title": "Staff Data Analyst",
            "Salary in USD": 44753,
            "Year": 2020
        },
        {
            "Company Location": "Germany",
            "Company Size": "Medium",
            "Employment Type": "Full-Time",
            "Expertise Level": "Junior",
            "Job Title": "AI Engineer",
            "Salary in USD": 35000,
            "Year": 2023
        },
        ...
    ],
    "Expertise Level": [
        "Expert",
        "Junior",
        ...
    ],
    "Job Title": [
        "Staff Data Analyst",
        "AI Engineer",
        ...
    ]
}

```

#### Dynamic: Filtered by a column's value

The rest of the API routes are dynamic. The first one is a general route that allows the user to filter using a single value for a column in the salaries table.

To access this route, follow this relative route after stating your local server: `/api/v1.0/filter/<column_name>/<value>`, where `<column_name>` is the name of one of the columns in the salaries table and `<value>` is the desired value for that column.

The returned data is in json format and follows the same structure as the above static route.

#### Dynamic: Filtered by country

There are three routes that filter the data by a single country and return aggregated data.

1. Job title counts: `/api/v1.0/country/<country_name>/job_title_counts`. This route returns a json dictionary where the keys correspond to the job titles available in the country selected in `<country_name>`. Here is an example of the returned data structure:

    ```json
    {
        ...,
        "Data Analyst": {
            "count": 20
        },
        "Data Architect": {
            "count": 2
        },
        "Data Engineer": {
            "count": 22
        },
        "Data Scientist": {
            "count": 36
        },
        ...
    }
    ```

2. Ordered job titles: `/api/v1.0/country/<country_name>/all_job_titles`. This route returns a json dictionary where the keys correspond to summary statics mean, median, max and mean. Each of these contains a dictionary of job titles available in the country selected in `<country_name>`, ordered descending by the summary statistic indicated in the key. Within a rank number there is a list with the first value corresponding to the job title name and the second the aggregated value (using the indicated summary statistic) of salary in USD. Here is an example of the returned data structure:

    ```json
    {
        "max_salary": {
            "1": [
                "Data Scientist",
                281000
            ],
            "2": [
                "AI Developer",
                275000
            ],
            ...
        },
        "mean_salary": {
            "1": [
                "AI Developer",
                275000.0
            ],
            "2": [
                "Machine Learning Software Engineer",
                206800.0
            ],
            ...
        },
        "median_salary": {
            "1": [
                "AI Developer",
                275000.0
            ],
            "2": [
                "Machine Learning Software Engineer",
                205400.0
            ],
            ...
        },
        "min_salary": {
            "1": [
                "AI Developer",
                275000
            ],
            "2": [
                "AI Scientist",
                200000
            ],
            ...
        }
    }
    ```

3. Top 10 ordered job titles: `/api/v1.0/country/<country_name>/top10_job_titles`. This route returns the same as the previous route, but it truncates the results to show only the top 10 job titles by each of the summary statistics.

#### Dynamic: Filtered by job title

There are three routes that filter the data by a single job title and return aggregated data.

1. Ordered countries: `/api/v1.0/job_title/<job_title_name>/all_countries`. This route returns a json dictionary where the keys correspond to summary statics mean, median, max and mean. Each of these contains a dictionary of countries where the job title selected in `<job_title_name>` is available, ordered descending by the summary statistic indicated in the key. Within a rank number there is a list with the first value corresponding to the country name and the second the aggregated value (using the indicated summary statistic) of salary in USD. Here is an example of the returned data structure:

    ```json
    {
        "max_salary": {
            "1": [
                "United States",
                370000
            ],
            "2": [
                "Canada",
                242000
            ],
            ...
        },
        "mean_salary": {
            "1": [
                "Puerto Rico",
                167500.0
            ],
            "2": [
                "United States",
                157723.5366242038
            ],
            ...
        },
        "median_salary": {
            "1": [
                "Puerto Rico",
                167500.0
            ],
            "2": [
                "United States",
                151305.0
            ],
            ...
        },
        "min_salary": {
            "1": [
                "Puerto Rico",
                135000
            ],
            "2": [
                "Ireland",
                102569
            ],
            ...
        }
    }
    ```

2. Top 10 ordered countries: `/api/v1.0/job_title/<job_title_name>/top10_countries`. This route returns the same as the previous route, but it truncates the results to show only the top 10 countries by each of the summary statistics.

3. Ordered experience levels: `/api/v1.0/job_title/<job_title_name>/experience_levels`. This route returns a similar data stucture from the previous two routes, but it aggregates by experience level, instead of by country.


#### Dynamic: Filtered by experience level

There are two dynamic routes that filter the data by an experience level and return aggregated data.

1. Ordered countries: `/api/v1.0/experience_level/<experience_level_name>/all_countries`. This route returns a similar data stucture from the first route filtered by job title, but it instead filters by the experience level indicated by `<experience_level_name>` (i.e. Juniot, Intermediate, Expert or Director).

2. Top 10 ordered countries: `/api/v1.0/experience_level/<experience_level_name>/top10_countries`. This route returns the same as the previous route, but it truncates the results to show only the top 10 countries by each of the summary statistics.


---

## References

https://www.openstreetmap.org/

https://www.jsdelivr.com/

https://apexcharts.com/javascript-chart-demos/

**Data:**

https://www.kaggle.com/datasets/iamsouravbanerjee/data-science-salaries-2023/data

https://opencagedata.com/api
