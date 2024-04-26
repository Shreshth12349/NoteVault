const notes = [
    {
        id: 1,
        title: 'Grocery List',
        body: 'For my next grocery trip, I\'ve compiled a list of essentials to ensure I don\'t forget anything. It includes items like milk, eggs, bread, apples, chicken, and pasta. With these basics in hand, I\'ll be able to prepare a variety of meals for the week ahead.',
        color: '#D37676',
    },
    {
        id: 2,
        title: 'Meeting Agenda',
        body: 'Our upcoming team meeting requires a clear agenda to keep us on track and make the most of our time together. We\'ll start by reviewing our progress from last week, followed by discussions on upcoming project deadlines. Then, we\'ll assign tasks for the week and wrap up by planning a team outing to foster camaraderie.',
        color: '#7F9F80',
    },
    {
        id: 3,
        title: 'Book Recommendations',
        body: 'As an avid reader, I\'ve compiled a list of book recommendations for fellow bookworms. These include titles like "Atomic Habits" by James Clear, "The Power of Now" by Eckhart Tolle, "Sapiens: A Brief History of Humankind" by Yuval Noah Harari, "Educated" by Tara Westover, and "Becoming" by Michelle Obama. Each offers unique insights and perspectives worth exploring.',
        color: '#F9E897',
    },
    {
        id: 4,
        title: 'Travel Bucket List',
        body: 'Dreaming of future adventures, I\'ve created a travel bucket list to inspire my wanderlust. It features destinations like the Grand Canyon, Europe for a backpacking adventure, Tokyo, Japan for its vibrant culture, the Maldives for relaxation, and a road trip along the captivating California coast. These destinations promise unforgettable experiences and memories to cherish for a lifetime.',
        color: '#FFC374',
    },
    {
        id: 5,
        title: 'Home Improvement Projects',
        body: 'Planning to spruce up my home with some DIY projects. Tasks include repainting the living room walls, installing new shelves in the kitchen, and redoing the landscaping in the backyard.',
        color: '#D37676',
    },
    {
        id:6,
        title: 'Fitness Goals',
        body: 'Setting new fitness goals for the upcoming months. Planning to run a half-marathon in the spring, increase weightlifting PRs, and incorporate more yoga into my routine.',
        color: '#7F9F80',
    },
    {
        id: 7,
        title: 'Recipes to Try',
        body: 'Collecting recipes to experiment with in the kitchen. Excited to try out dishes like homemade pizza, Thai curry, Mediterranean stuffed peppers, and vegan chocolate cake.',
        color: '#F9E897',
    },
    {
        id: 8,
        title: 'Language Learning',
        body: 'Dedicating time each day to improve my language skills. Currently focusing on learning Spanish vocabulary, practicing French conversation, and mastering German grammar.',
        color: '#FFC374',
    }
];

const createNote = (title, body) => {
    const newNote = {
        id: notes.length + 1, // Assign a unique ID based on the length of the array
        title: title,
        body: body,
        color: 'red',
    };
    notes.push(newNote);
};

const getNote = (id) => {
    const fetchedNote = notes.find(note => note.id === id)
    if(fetchedNote){
        console.log("note found")
    }
    return fetchedNote
}

const updateNoteTitle = (id, newTitle) => {
    console.log(`Note with id ${id}`)
    const noteToBeUpdated = notes.find(note => note.id === id);
    if (noteToBeUpdated) {
        noteToBeUpdated.title = newTitle;
        console.log(`new title = ${newTitle}`)
        console.log("Note body updated successfully.");
        return true;
    } else {
        console.error("Note not found.");
        return false;
    }
};
const updateNoteBody = (id, newBody) => {
    console.log(`Note with id ${id}`)
    const noteToBeUpdated = notes.find(note => note.id === id);
    if (noteToBeUpdated) {
        noteToBeUpdated.body = newBody;
        console.log(`new body = ${newBody}`)
        console.log("Note updated successfully.");
        return true;
    } else {
        console.error("Note not found.");
        return false;
    }
};
const updateNoteColor = (id, newColor) => {
    const noteToBeUpdated = notes.find(note => note.id === id);
    if (noteToBeUpdated) {
        noteToBeUpdated.color = newColor;
        return true;
    } else {
        console.error("Note not found.");
        return false;
    }
};


module.exports = {notes, createNote, getNote, updateNoteTitle,updateNoteBody, updateNoteColor }