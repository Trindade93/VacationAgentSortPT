// Sample agent data
const agents = [
   {
      "name": "Asmae Naboulsi",
      "vacationDays": 4
    },
    {
      "name": "Aya Alji",
      "vacationDays": 19
    },
    {
      "name": "Cardigon Codling",
      "vacationDays": 18
    },
    {
      "name": "Chaimaa Jalal",
      "vacationDays": 18
    },
    {
      "name": "Cristina Eusébio",
      "vacationDays": 19
    },
    {
      "name": "Daniel Soares",
      "vacationDays": 31
    },
    {
      "name": "Dany Hernandez-Ruiz",
      "vacationDays": 23
    },
    {
      "name": "Djebrail Hedid",
      "vacationDays": 16
    },
    {
      "name": "Elise Martinez",
      "vacationDays": 24
    },
    {
      "name": "Elmira Shahanaghi",
      "vacationDays": 22
    },
    {
      "name": "Firas Slama",
      "vacationDays": 14
    },
    {
      "name": "Fourat Gueddana",
      "vacationDays": 25
    },
    {
      "name": "Gabriela Lins",
      "vacationDays": 22
    },
    {
      "name": "Giris Blaise",
      "vacationDays": 14
    },
    {
      "name": "Hassine Amamou",
      "vacationDays": 27
    },
    {
      "name": "Ives Nya",
      "vacationDays": 19
    },
    {
      "name": "Jammeli Nejmeddine",
      "vacationDays": 25
    },
    {
      "name": "Jean Sene",
      "vacationDays": 21
    },
    {
      "name": "Joana Magalhães",
      "vacationDays": 17
    },
    {
      "name": "Joana Teixeira",
      "vacationDays": 16
    },
    {
      "name": "Julija Sipailaité",
      "vacationDays": 22
    }
];

// National holidays (dates provided by the user)
const holidays = [
  new Date('2024-08-15'), // Assumption Day
  new Date('2024-10-05'), // Republic Day
  new Date('2024-11-01'), // All Saints' Day
];

// Initialize an object to store assigned vacation days for each agent
const processedAgents = [];

// Helper function to check if a date is a weekend (Saturday or Sunday)
function isWeekend(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

// Verify if date is a National Holiday
function isHoliday(date){
    return holidays.includes(date);
}

// Helper function to get the month and year of a date
function getMonthYear(date) {
  return `${date.getMonth()}-${date.getFullYear()}`;
}

// Initialize the start date (July 16, 2024)
const startDate = new Date('2024-07-16');
const endDate = new Date('2024-11-30');

function getMonthAndDay(int){
    var month = Math.ceil(Math.random() * 4 + 6);
    
    if(month % 2 === 0){
        return new Date (2024, month, Math.ceil(Math.random() * 30));
    }
    return new Date (2024, month, Math.ceil(Math.random() * 31));
}

// Distribute vacation days
for (const agent of agents) {
  let remainingDays = agent.vacationDays;
  let consecutiveDays = 0; // Counter for consecutive days
  let isDistributed = false;
  let operator = {
      name: agent.name,
      assignedDays: [[], [], [], []]
  }
  while (remainingDays > 0) {
        let currentDate = getMonthAndDay();
        let month = currentDate.getMonth() - 7;
        if(isHoliday(currentDate)) continue;
        if(operator.assignedDays[month].includes(currentDate)) continue;
        if(operator.assignedDays[month].length === 10) continue;
        if(remainingDays > 10 && !isDistributed){
            for(i = 0; i < 10; i++){
                if(isWeekend(currentDate) || isHoliday(currentDate)) {
                    i--;
                    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
                    continue;
                }
                if(operator.assignedDays[month].includes(currentDate)) {
                    remainingDays++;
                    continue;
                }
                operator.assignedDays[month].push(currentDate)
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
                remainingDays--;              
            }
            isDistributed = true;
            continue;
        }
        operator.assignedDays[month].push(currentDate);
        remainingDays--;
      }
     processedAgents.push(operator); 
    }
  

var finalResult;

processedAgents.forEach(agent => {
    finalResult = finalResult + agent.name + '\n'
    agent.assignedDays.forEach(month => month.forEach(day => 
    finalResult = finalResult + day.toDateString() + '\n'))
})

console.log(finalResult);

//processedAgents.forEach(agent => console.log(agent.name + " has the following vacation days: " + agent.assignedDays.forEach.toDateString()) )