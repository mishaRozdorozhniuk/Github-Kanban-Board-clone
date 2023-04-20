import {useDispatch} from 'react-redux';
import {ActionCreator, bindActionCreators} from 'redux';
import * as issueActionCreators from '../store/action-creators/issue';
import * as starsActionCreators from '../store/action-creators/stars';

type ActionCreatorsMapObject = {
    [actionCreatorKey: string]: ActionCreator<any>;
};

export const useActions = () => {
    const dispatch = useDispatch();

    const issueActions: ActionCreatorsMapObject = { ...issueActionCreators };
    const starsActions: ActionCreatorsMapObject = { ...starsActionCreators };

    return {
        issue: bindActionCreators(issueActions, dispatch),
        stars: bindActionCreators(starsActions, dispatch),
    };
};
