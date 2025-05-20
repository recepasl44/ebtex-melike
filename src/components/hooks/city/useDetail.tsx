import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchCourse } from '../../../slices/courses/detail/thunk';

export function useCourseShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.courseShow
    );
    
    const getCourse = useCallback(async (courseId: number) => {
        const resultAction = await dispatch(fetchCourse(courseId));
        console.log('Fetching course with ID:', resultAction);
        if (fetchCourse.fulfilled.match(resultAction)) {
        return resultAction.payload;
        }
        return null;
    }, [dispatch]);
    
    return { course: data, status, error, getCourse };
    }
export default useCourseShow;