import { apiSlice } from "../api/apiSlice";

export const addTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),

      // pessimistic cache update
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: createdTask } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft?.push(createdTask);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // edit task
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      // pessimistic cache update
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: task } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getTask", arg.id, (draft) => {
              return task;
            })
          );

          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              return draft.map((draftTask) =>
                draftTask.id === task.id ? task : draftTask
              );
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // delete task
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      // optimistic cache update
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            return draft?.filter((task) => task?.id !== arg);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.log(error);
        }
      },
    }),

    // status change
    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useUpdateStatusMutation,
} = addTaskApi;
