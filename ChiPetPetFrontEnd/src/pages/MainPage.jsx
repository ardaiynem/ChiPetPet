import { Container, Navbar, Button, Row, Stack } from "react-bootstrap";
import MenuCards from "../components/MenuCards";
import SearchPetPanel from "../components/SearchPetPanel";
import SingleAnimalPanel from "../components/SingleAnimalPanel";
import SearchVeterinarian from "../components/user/SearchVeterinarian";
import MyPets from "../components/user/MyPets";


function MainPage() {

    return (
        <>
            <Container fluid className="h-100 p-0">
                <Stack gap={0} className="h-100">
                    <Navbar expand="lg" bg="primary" className="flex-grow-0">
                        <Container>
                            <Navbar.Brand href="#">ChiPetPet</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <div className="p-0 flex-grow-1">
                        <Stack gap={0} direction="horizontal" className="h-100 d-flex justify-content-center">
                            {/* <MenuCards /> */}
                            {/* <SearchPetPanel /> */}
                            {/* <SingleAnimalPanel /> */}
                            {/* <SearchVeterinarian /> */}
                            <MyPets />
                        </Stack>
                    </div>
                </Stack>
            </Container>
        </>
    )
}

export default MainPage;