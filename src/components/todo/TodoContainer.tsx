import TodoCard from './TodoCard';
import TodoFilter from './TodoFilter';
import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAppDispatch } from '@/redux/hooks';
import { useAddTodosMutation, useGetTodosQuery } from '@/redux/api/api';
import { TTodo } from '@/redux/features/todoSlice';



const TodoContainer = () => {
  // const { todos } = useAppSelector((state) => state.todos);
  const [priority,setPriority] = useState("");
  const { data: todos, isLoading } = useGetTodosQuery(priority);
  const [addTodo] = useAddTodosMutation();
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const initialCurrentTodo = {
    id: "",
    title: "",
    description: ""
  }
  const [ currentTodo, setCurrentTodo ] = useState(initialCurrentTodo)

  const handleEdit = (item: TTodo) => {
    setIsOpenModal(true);
    setIsEditMode(true);
    setCurrentTodo((prevValue) => {
      return {
        ...prevValue,
        ...item
      }
    })
    return item;
  };

  const handleTodoChange = (event: FormEvent) => {
    event.preventDefault();
    const { name, value } = event.target as HTMLInputElement;
    setCurrentTodo((prevValue) => {
      return {
        ...prevValue,
        [ name ]: value,
      }
    })
  }


  const handleSubmit = (event: FormEvent) => {
    console.log("submitte")
    event.preventDefault();
    // if (isEditMode) {
    //   dispatch(editTodo(currentTodo));
    //   setIsEditMode(false);
    //   setCurrentTodo(initialCurrentTodo)
    //   return;
    // }
    addTodo(currentTodo);
    setCurrentTodo(initialCurrentTodo)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <div className="flex justify-between mb-5 ">
        {/* add todo modal */}
        <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary-gradient text-xl font-semibold">
              Add todo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add task</DialogTitle>
              <DialogDescription>
                Add your tasks that you want to finish.
              </DialogDescription>
            </DialogHeader>
            {/* add todo form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="task" className="text-right">
                    Task
                  </Label>
                  <Input
                    id="title"
                    name='title'
                    value={currentTodo.title}
                    onChange={handleTodoChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    onChange={handleTodoChange}
                    id="description"
                    name='description'
                    value={currentTodo.description}
                    className="col-span-3"
                  />
                </div>
                <div>
                </div>
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* add todo modal */}
        <TodoFilter priority={priority} setPriority ={setPriority} />
      </div>

      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        {
          todos?.data?.length > 0 ?
            <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
              {todos?.data?.map((item: TTodo) => (
                <TodoCard key={item._id as string} item={item} onEdit={handleEdit} />
              ))}
            </div>
            :
            <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
              <p>Add Task</p>{' '}
            </div>
        }
      </div>
    </div>
  );
};

export default TodoContainer;
