const daysSinceIssueCreation = (issueCreationDate: string): number => {
    const date = issueCreationDate.slice(0, 10);
    const today: Date = new Date();
    const creationDate: Date = new Date(date);
    const timeDiff: number = today.getTime() - creationDate.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
}

export default daysSinceIssueCreation;