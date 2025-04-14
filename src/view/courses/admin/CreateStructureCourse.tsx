"use client"

import { ICourse } from '@/shared/interfaces/courses/Course';
import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CreateStructureCourseForm from '@/forms/CreateStructureCourseForm';
import AiTopicCreateStructureDialog from './AiTopicCreateStructureDialog';

const CreateStructureCourse = () => {
    const [courseData, setCourseData] = useState<ICourse | null>(null)
    return (
        <Stack spacing={4}>
            <AiTopicCreateStructureDialog setCourseData={setCourseData}/>
            {courseData ? <CreateStructureCourseForm courseData={courseData}/> : <Typography>Вы еще ничего не сгенерировали</Typography>}
        </Stack>
    );
};

export default CreateStructureCourse;