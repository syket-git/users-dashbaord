import HomePage from "@/components/pages/Home";
import { getUsers } from "@/services/user";
import { Container } from "@chakra-ui/react";

const Home = async () => {
  const currentPage = 1;
  const initialSearch = "";
  const response = await getUsers(currentPage, initialSearch);
  return (
    <Container p="5">
      <HomePage
        pagination={response.data?.meta?.pagination}
        users={response?.data?.data}
      />
    </Container>
  );
};

export default Home;
