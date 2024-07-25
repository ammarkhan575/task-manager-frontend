import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters').max(50, 'Title should be less than 50 characters'),
  description: yup.string().required('Description is required').min(5, 'Description must be at least 5 characters').max(200, 'Description should be less than 200 characters'),
});

const TaskForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-sm mb-1">Title</label>
        <input {...register('title')} className="w-full px-3 py-2 border rounded-md" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Description</label>
        <textarea {...register('description')} className="w-full px-3 py-2 border rounded-md" rows="4" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Save</button>
    </form>
  );
};

export default TaskForm;
