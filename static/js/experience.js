//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VIEW3

const expUrl = 'http://127.0.0.1:5000/api/v1.0/salaries'

function initExperienceLevelsDropdown() {
  let dropdownexperiencelevel = d3.select("#expDataset");

    // Load experience levels from API
    d3.json(expUrl).then(function(data) {


  // Dummy data of experience levels
  // let experienceLevels = ["Beginner", "Intermediate", "Advanced"]; 
  let experienceLevels = data["Expertise Level"];

  experienceLevels.forEach(function(experienceLevel) {
    dropdownexperiencelevel.append("option").text(experienceLevel).property("value", experienceLevel);
  });


  handleExperienceLevelChange(experienceLevels[0]); // Initialize with the first experience level

})
}


function loadDataForExperienceLevel(experienceLevel) {


    const apiUrl = `http://127.0.0.1:5000/api/v1.0/experience_level/${experienceLevel}/top10_countries`
  
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  

function handleExperienceLevelChange(selectedExperienceLevel) {
  lineExperienceGraph(selectedExperienceLevel)
}

initExperienceLevelsDropdown();


// a line chart that displays Top10 highest paying countries for that experience level by selecting EXPERIENCE LEVEL from Dropdown3
// API route: /api/v1.0/experience_level/<experience_level_name>/top10_countries
function lineExperienceGraph(experience) {
    loadDataForExperienceLevel(experience)
    .then(data => {
      console.log(`Top 10 Experience for ${experience}:`, data);
      
    let salaries = [];
    let countries = [];

    for (let key in data.max_salary) {
        if (data.max_salary.hasOwnProperty(key)) {
            salaries.push(data.max_salary[key][1]);
            countries.push(data.max_salary[key][0]);
        }
    }

      

      var options = {
        series: [{
          name: "Salary (USD)",
          data: salaries
      }],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text:'Highest Paying Countries for Expertise: ' + experience,
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: countries,
      }
      };

      // remove previous chart if it exists
       
            document.querySelector("#experience-line-chart").innerHTML = "";
        
      var chart = new ApexCharts(document.querySelector("#experience-line-chart"), options);
      chart.render();
    
    })
    .catch(error => {
      console.error('Error handling job title change:', error);
    });
}

// an interactive bubble map that displays the salaries for the experience level selected for all countries
// API route: /api/v1.0/experience_level/<experience_level_name>/all_countries

