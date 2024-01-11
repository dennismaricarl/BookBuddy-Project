import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookBuddyApi = createApi({
  reducerPath: "bookBuddyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com",

    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      const { token } = getState();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    // fetch All the books from Api
    fetchBooks: builder.query({
      query: () => "/api/books",
    }),

    // fetch single book by Id
    fetchBookById: builder.query({
      query: (bookId) => `/api/books/${bookId}`,
    }),
    // fetch the user checked out books
    fetchReservation: builder.query({
      query: () => "/api/reservations",
      providesTags: ["reservations"]
    }),

    // fetch the logged in user details
    fetchUser: builder.query({
      query: () => ({
        url: "/api/users/me",
      }),
      providesTags: ["user"]
    }),

    // user registration
    register: builder.mutation({
      query: (user) => ({
        url: "/api/users/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
    }),

    //user Login
    login: builder.mutation({
      query: (user) => ({
        url: "/api/users/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.log(response.status);
      },
    }),

    // update book availability (checkout or not)
    updateBookAvailability: builder.mutation({
      query: (bookId, available) => ({
        url: `/api/books/${bookId}`,
        method: "PATCH",

        body: { available: available },
      }),
      invalidatesTags: ["reservations"]
    }),

    //delete existing reservation (update book's availability)
    deleteReservation: builder.mutation({
      query: (reservationId) => ({
        url: `/api/reservations/${reservationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reservations"]
    }),
  }),
});

export default bookBuddyApi;
export const {
  useFetchBooksQuery,
  useFetchBookByIdQuery,
  useFetchReservationQuery,
  useFetchUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useDeleteReservationMutation,
  useUpdateBookAvailabilityMutation,
} = bookBuddyApi;
