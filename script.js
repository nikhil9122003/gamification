let points = 0;
let streak = 0;
let lastCompletionDate = null;

const taskPoints = {
    task1: 10,
    task2: 15,
    task3: 20,
    task4: 5,
    task5: 15,
    task6: 10,
    task7: 25,
    task8: 20,
    task9: 30,
    task10: 25,
    task11: 15,
    task12: 20,
    task13: 20,
    task14: 15,
    task15: 10,
    task16: 30,
    task17: 15,
    task18: 10,
    task19: 20,
    task20: 25,
};

const taskCompletionCounts = {
    task1: 0,
    task2: 0,
    task3: 0,
    task4: 0,
    task5: 0,
    task6: 0,
    task7: 0,
    task8: 0,
    task9: 0,
    task10: 0,
    task11: 0,
    task12: 0,
    task13: 0,
    task14: 0,
    task15: 0,
    task16: 0,
    task17: 0,
    task18: 0,
    task19: 0,
    task20: 0,
};

const streakRewards = [
    { streak: 3, points: 15, reward: '15 Bonus Points!' },
    { streak: 5, points: 25, reward: '25 Bonus Points!' },
    { streak: 7, points: 40, reward: '40 Bonus Points!' },
];

const badges = [
    { points: 100, name: 'Wellness Warrior' },
    { points: 200, name: 'Mental Health Champion' },
    { points: 300, name: 'Ultimate Achiever' },
];

function calculatePoints(taskId) {
    return taskPoints[taskId];
}

function checkForBadges() {
    const badgesEarned = badges.filter(badge => points >= badge.points);
    document.getElementById('badges').innerHTML = badgesEarned.map(badge => `<span class="badge">${badge.name}</span>`).join('');
}

function checkStreak() {
    const today = new Date();
    const isSameDay = lastCompletionDate && today.toDateString() === lastCompletionDate.toDateString();

    if (isSameDay) {
        return;
    } else if (lastCompletionDate && today.getDate() === lastCompletionDate.getDate() + 1) {
        streak++;
    } else if (lastCompletionDate && today.getDate() !== lastCompletionDate.getDate()) {
        streak = 1; // reset streak
    } else {
        streak = 1; // new streak
    }
    lastCompletionDate = today;

    document.getElementById('streak').innerText = streak;

    const reward = streakRewards.find(reward => reward.streak === streak);
    if (reward) {
        points += reward.points;
        document.getElementById('rewards').innerText = `Streak Reward: ${reward.reward}`;
        updatePoints();
    }
}

function updatePoints() {
    points = 0;
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    taskCheckboxes.forEach(task => {
        if (task.checked) {
            points += calculatePoints(task.id);
            taskCompletionCounts[task.id]++;
        }
    });

    document.getElementById('points').innerText = points;
    document.getElementById('points-progress').style.width = `${Math.min(points / 300 * 100, 100)}%`;
    checkForBadges();
    checkStreak();
}

document.querySelectorAll('.task-checkbox').forEach(task => {
    task.addEventListener('change', updatePoints);
});
