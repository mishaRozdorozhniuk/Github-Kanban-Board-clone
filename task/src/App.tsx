import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Input} from 'antd';
import {useTypedSelector} from './hooks/useTypedSelector';
import {useActions} from './hooks/useAction';
import IssueBoard from './components/IssueBoard/IssueBoard';
import Star from './icons/Star';
import './components/IssueBoard/IssueBoard.css'

const { Search } = Input;

interface Issue {
  id: number;
  title: string;
}

interface Issue {
  id: number;
  title: string;
}

interface IBoard {
  id: number;
  title: string;
  items: Issue[];
  body?: string;
}

interface GitHubRepoLink {
  user: string;
  repo: string;
}

interface StarsProfileQuantity {
  html_url?: string;
  stargazers_count?: number;
}

const App: React.FC = () => {
  const [boards, setBoards] = useState([
    {id: 1, title: 'Todo', items: []},
    {id: 2, title: 'In Progress', items: []},
    {id: 3, title: 'Finished', items: []}
  ]);
  const [issuesUrl, setIssuesUrl] = useState<string>('https://api.github.com/repos/mishaRozdorozhniuk/Cart/issues');
  const {issues, error, loading} = useTypedSelector(state => state.issue)
  const {starsQuantity} = useTypedSelector(state => state.stars)
  const [starsProfileQuantity, setStarsProfileQuantity] = useState<StarsProfileQuantity>({})
  const [gitHubRepoLink, setGitHubRepoLink] = useState<GitHubRepoLink>({ repo: '', user: ''})
  const {issue, stars} = useActions()

  useEffect(() => {
    setGitHubRepoLink({ user: '', repo: '' });
    setBoards((prevBoards: any) => {
      const boardToUpdate = prevBoards.find((board: IBoard) => board.id === 1);
      if (!boardToUpdate) return prevBoards;
      const updatedBoard = { ...boardToUpdate, items: [...issues] };
      return prevBoards.map((board: IBoard) => (board.id === 1 ? updatedBoard : board));
    });
    setStarsProfileQuantity(starsQuantity)
  }, [issues, starsQuantity]);

  useEffect(() => {
    const url = starsProfileQuantity.html_url?.split('/');
    if (url && url.length) {
      const repo = url[url.length - 1];
      const user = url[url.length - 2];
      setGitHubRepoLink({ repo, user });
    }
  }, [starsProfileQuantity]);

  const getGitHubIssues = () => {
    setStarsProfileQuantity({})
    setBoards((prevBoards) => prevBoards.map(board => {
      if (board.items.length > 0) {
        return {...board, items: []};
      } else {
        return board;
      }
    }));
    const baseUrl = issuesUrl.slice(0, issuesUrl.indexOf('/issues'));
    issue.fetchIssues(issuesUrl)
    stars.fetchStartQuantity(baseUrl)
  }

  const handleGetIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssuesUrl(e.target.value)
  }

  if (loading) {
    return <div>Loading..</div>
  }

  if (error) {
    return (
        <div className="fetching-error">
          {error}
          <span>Please check the correctness of the link to the repository, because that might be the problem :)</span>
          <span>Recommended link type by GitHub API to get issues - https://api.github.com/repos/USERNAME/NAME_OF_REPO/issues</span>
        </div>
    );
  }

  return (
      <div className='app'>
        <div className='board__loading'>
          <Search placeholder='Enter repo URL' value={issuesUrl} onChange={(e) => handleGetIssues(e)} />
          <Button type='primary' onClick={getGitHubIssues}>Load</Button>
        </div>
        <div className="repo__info">
          <a className="board__link" href={starsProfileQuantity.html_url} target="_blank"> {gitHubRepoLink.user} {'>'} {gitHubRepoLink.repo}</a>
          <div className='star__wrapper'>
            <Star />
            <span>{starsProfileQuantity.stargazers_count} stars</span>
          </div>
        </div>
        <IssueBoard boards={boards} setBoards={setBoards} />
      </div>
  );
}

export default App;
