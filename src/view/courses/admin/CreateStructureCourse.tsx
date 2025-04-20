"use client"

import CreateStructureCourseForm from '@/forms/CreateStructureCourseForm';
import { ICourse } from '@/shared/interfaces/courses/Course';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import AiTopicCreateStructureDialog from './AiTopicCreateStructureDialog';

const CreateStructureCourse = () => {
    const [courseData, setCourseData] = useState<ICourse | null>(null)
    return (
        <Stack spacing={4}>
            <AiTopicCreateStructureDialog setCourseData={setCourseData} courseData={courseData}/>
            {courseData ? <CreateStructureCourseForm courseData={courseData}/> : <Typography>Вы еще ничего не сгенерировали</Typography>}
        </Stack>
    );
};

export default CreateStructureCourse;