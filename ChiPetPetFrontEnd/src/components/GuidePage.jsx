import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { PanelContext } from "../contexts/panelContext";

function GuidePage() {
  const { setCurrentPanel } = useContext(PanelContext);

  const guideData = [
    {
      topic: "Veterinary Care Basics",
      relatedSpecies: "All Animals",
      description:
        "This comprehensive guide covers the fundamental aspects of veterinary care for all animals. Whether you have a dog, cat, bird, reptile, or any other pet, learn about general health, vaccinations, and preventive care to keep your beloved companions in top condition.",
    },
    {
      topic: "Dog Grooming Tips",
      relatedSpecies: "Dogs",
      description:
        "Explore our expert tips for grooming your dog at home. From brushing and bathing to nail trimming and ear cleaning, this guide provides step-by-step instructions to help you maintain your dog's hygiene and overall well-being.",
    },
    {
      topic: "Cat Nutrition Guide",
      relatedSpecies: "Cats",
      description:
        "Discover a comprehensive guide to cat nutrition and feeding. Learn about the dietary needs of cats, different types of cat food, and tips for maintaining a healthy diet. Ensure your feline friend receives the proper nutrients for a long and happy life.",
    },
    {
      topic: "Bird Health Checklist",
      relatedSpecies: "Birds",
      description:
        "Use this checklist to ensure the health and well-being of your pet bird. From cage setup and nutrition to regular health checkups, this guide covers essential aspects of bird care. Keep your feathered friend happy and healthy with our helpful tips.",
    },
    {
      topic: "Reptile Habitat Setup",
      relatedSpecies: "Reptiles",
      description:
        "Create a suitable habitat for your pet reptiles with our guide to reptile habitat setup. Learn about the specific environmental requirements of different reptile species, including temperature, lighting, and substrate. Provide a comfortable and secure home for your scaly companions.",
    },
    {
      topic: "Fish Tank Maintenance",
      relatedSpecies: "Fish",
      description:
        "Maintaining a healthy environment for your aquarium fish is crucial. This guide covers proper fish tank setup, water quality management, and tips for keeping your fish happy and thriving.",
    },
    {
      topic: "Small Mammal Care",
      relatedSpecies: "Small Mammals",
      description:
        "Learn how to care for small mammals such as hamsters, guinea pigs, and rabbits. This guide provides insights into their nutritional needs, housing requirements, and general well-being.",
    },
    {
      topic: "Horse Grooming Techniques",
      relatedSpecies: "Horses",
      description:
        "Proper grooming is essential for the health and appearance of horses. Explore effective grooming techniques, including brushing, mane and tail care, and bathing, to keep your horse looking and feeling its best.",
    },
    {
      topic: "Exotic Pet Health",
      relatedSpecies: "Exotic Pets",
      description:
        "Exotic pets, like reptiles, amphibians, and small mammals, have unique health considerations. This guide offers tips on maintaining the health and well-being of your exotic companions.",
    },
    {
      topic: "Training Your Pet Parrot",
      relatedSpecies: "Parrots",
      description:
        "Parrots are intelligent and social birds that can be trained to perform various tricks and behaviors. Learn effective training techniques to enhance your bond with your pet parrot.",
    },
    {
      topic: "Rabbit Diet and Nutrition",
      relatedSpecies: "Rabbits",
      description:
        "Rabbits have specific dietary needs for optimal health. Explore the essential elements of a rabbit's diet, including hay, pellets, and fresh vegetables, to ensure a balanced nutrition plan.",
    },
    {
      topic: "Amphibian Habitat Setup",
      relatedSpecies: "Amphibians",
      description:
        "Setting up the right habitat is crucial for the well-being of amphibian pets such as frogs and salamanders. Learn about substrate, temperature, and humidity requirements to create a suitable living environment.",
    },
    {
      topic: "Guinea Pig Care Guide",
      relatedSpecies: "Guinea Pigs",
      description:
        "Guinea pigs are popular small pets known for their social nature. This guide covers aspects of guinea pig care, including housing, diet, and health considerations, to ensure a happy and healthy life for your guinea pig.",
    },
    {
      topic: "Training Your Cat",
      relatedSpecies: "Cats",
      description:
        "Cats can be trained to perform tricks and follow commands. Discover effective training methods to engage with your cat and strengthen the bond between you and your feline companion.",
    },
    {
      topic: "Hamster Enrichment Ideas",
      relatedSpecies: "Hamsters",
      description:
        "Enrichment is vital for the well-being of hamsters. Explore creative ideas to provide mental and physical stimulation for your pet hamster, enhancing its overall quality of life.",
    },
    {
      topic: "Turtle Care Guidelines",
      relatedSpecies: "Turtles",
      description:
        "Ensure the well-being of your pet turtles with our care guidelines. Learn about proper housing, diet, and environmental conditions to provide a healthy and happy life for your shelled companions.",
    },
    {
      topic: "Guide to Ferret Health",
      relatedSpecies: "Ferrets",
      description:
        "Ferrets are playful and curious pets that require special care. This guide covers key aspects of ferret health, including vaccinations, grooming, and common health issues, to keep your ferret in top condition.",
    },
    {
      topic: "Caring for Pet Snakes",
      relatedSpecies: "Snakes",
      description:
        "Discover the essentials of caring for pet snakes, from choosing the right enclosure to providing proper heating and feeding. This guide offers valuable insights into maintaining the health and happiness of your slithery companions.",
    },
    {
      topic: "Guide to Rabbit Grooming",
      relatedSpecies: "Rabbits",
      description:
        "Proper grooming is crucial for the well-being of rabbits. Explore effective grooming techniques, including brushing, nail trimming, and ear cleaning, to keep your bunny friend looking and feeling its best.",
    },
    {
      topic: "Hermit Crab Habitat Setup",
      relatedSpecies: "Hermit Crabs",
      description:
        "Create an ideal habitat for your pet hermit crabs with our setup guide. Learn about substrate choices, humidity requirements, and providing suitable shells for these fascinating crustacean companions.",
    },
    {
      topic: "Snake Species Identification",
      relatedSpecies: "Snakes",
      description:
        "Learn how to identify different snake species based on their physical characteristics, color patterns, and behavior. This guide provides insights into recognizing and understanding various snakes commonly kept as pets.",
    },
    {
      topic: "Basic Aquarium Setup",
      relatedSpecies: "Fish",
      description:
        "Setting up a basic aquarium is the first step in creating a thriving underwater environment. Explore the essentials of aquarium setup, including tank size, filtration, and water conditioning, for happy and healthy fish.",
    },
    {
      topic: "Introduction to Lizard Care",
      relatedSpecies: "Lizards",
      description:
        "Get started with lizard care by learning about the basic requirements for popular pet lizard species. This guide covers aspects such as enclosure setup, heating, and dietary considerations for a variety of pet lizards.",
    },
    {
      topic: "Feline Dental Care",
      relatedSpecies: "Cats",
      description:
        "Maintain your cat's dental health with proper care practices. This guide covers tooth brushing, dental treats, and routine checkups to ensure your feline friend enjoys good oral hygiene.",
    },
    {
      topic: "Introduction to Reptile Handling",
      relatedSpecies: "Reptiles",
      description:
        "Learn safe and effective techniques for handling pet reptiles. This guide provides insights into the proper way to pick up and handle different reptile species, fostering a positive relationship between you and your scaly companions.",
    },
    {
      topic: "Choosing the Right Bird Cage",
      relatedSpecies: "Birds",
      description:
        "Selecting the right cage is crucial for the well-being of your pet bird. Explore factors such as size, bar spacing, and material to make an informed decision when choosing a cage for your feathered friend.",
    },
    {
      topic: "Aquatic Turtle Feeding Guide",
      relatedSpecies: "Turtles",
      description:
        "Ensure your aquatic turtles receive a balanced and nutritious diet. This feeding guide covers the types of food, feeding frequency, and essential nutrients required to keep your turtles healthy and thriving.",
    },
    {
      topic: "Puppy Training Basics",
      relatedSpecies: "Dogs",
      description:
        "Start training your puppy with essential commands and behavior basics. This guide provides step-by-step instructions for crate training, potty training, and basic obedience to foster a well-behaved canine companion.",
    },
    {
      topic: "Safe Handling of Small Mammals",
      relatedSpecies: "Small Mammals",
      description:
        "Whether you have a hamster, guinea pig, or rabbit, learn the safe and gentle ways to handle small mammals. This guide covers techniques to minimize stress and ensure a positive interaction with your furry friends.",
    },
    {
      topic: "Guppy Breeding Tips",
      relatedSpecies: "Fish",
      description:
        "Explore the fascinating world of guppy breeding with our tips and insights. Learn about breeding setups, identifying pregnant guppies, and caring for fry to successfully raise a new generation of these colorful aquarium fish.",
    },
    {
      topic: "Terrarium Setup for Amphibians",
      relatedSpecies: "Amphibians",
      description:
        "Create a suitable habitat for your pet amphibians with our terrarium setup guide. From substrate choices to humidity control, this guide covers the essentials to provide a comfortable and secure environment for your amphibian companions.",
    },
    {
      topic: "Caring for Senior Dogs",
      relatedSpecies: "Dogs",
      description:
        "As dogs age, their care needs change. This guide offers insights into providing proper nutrition, exercise, and veterinary care for senior dogs, ensuring they enjoy a comfortable and happy life in their golden years.",
    },
    {
      topic: "Hermit Crab Molting Process",
      relatedSpecies: "Hermit Crabs",
      description:
        "Understand the molting process of hermit crabs and provide proper care during this crucial time. Learn to recognize signs of molting, create a molting-friendly environment, and support your hermit crabs through the molting cycle.",
    },
    {
      topic: "Bird Toys for Mental Stimulation",
      relatedSpecies: "Birds",
      description:
        "Keep your pet bird mentally stimulated and entertained with a variety of engaging toys. This guide explores different types of bird toys and provides tips for selecting and introducing toys to enhance your bird's well-being.",
    },
    {
      topic: "Choosing the Right Cat Litter",
      relatedSpecies: "Cats",
      description:
        "Selecting the right cat litter is essential for a clean and odor-free environment. This guide covers various types of cat litter, considerations for multi-cat households, and tips for maintaining a hygienic litter box.",
    },
    {
      topic: "Raising Healthy Chicks",
      relatedSpecies: "Chickens",
      description:
        "For backyard chicken enthusiasts, this guide covers the essentials of raising healthy chicks. From brooding to introducing them to the coop, learn the key steps to ensure the well-being and growth of your young feathered flock.",
    },
    {
      topic: "Exotic Fish Species Showcase",
      relatedSpecies: "Fish",
      description:
        "Explore the world of exotic fish species for your aquarium. This showcase highlights unique and colorful fish varieties, providing information on their care requirements, compatibility, and stunning visual appeal.",
    },
    {
      topic: "Tips for Traveling with Pets",
      relatedSpecies: "All Animals",
      description:
        "Planning a trip with your furry or feathered companion? This guide offers practical tips for traveling with pets, including preparation, transportation considerations, and ensuring a safe and comfortable journey for your animal companions.",
    },
    // Add more items as needed
  ];

  const [guides, setGuides] = useState(guideData);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = guides.slice(startIndex, endIndex);

  const totalPages = Math.ceil(guideData.length / itemsPerPage);

  useEffect(() => {
    console.log(guides);
    setGuides(
      guideData.filter(
        (guide) =>
          guide.description.toLowerCase().includes(search.toLowerCase()) ||
          guide.topic.toLowerCase().includes(search.toLowerCase()) ||
          guide.relatedSpecies.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedItem(null); // Reset selected item when changing pages
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button
        className="position-relative top-0 start-2 m-1"
        onClick={() => setCurrentPanel("back")}
      >
        Back
      </Button>

      <div className="d-flex align-items-center mb-5">
        <div className="d-flex mt-1">
          <input
            style={{ marginLeft: "50px", width: "300px" }}
            className="form-control"
            type="text"
            placeholder={search === "" ? "Enter keywords to search guides" : ""}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="" style={{ display: "flex", marginLeft: "50px" }}>
        <div style={{ flex: "0 0 50%" }}>
          <table className="table table-striped" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Related Species</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)}>
                  <td>{item.topic}</td>
                  <td>{item.relatedSpecies}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 text-center">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>{" "}
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant="secondary"
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "4px" }}
            >
              Next
            </Button>
          </div>
        </div>

        <div style={{ flex: "0 0 40%", marginLeft: 40 }}>
          {selectedItem && (
            <>
              <h4>Details</h4>
              <p>
                <strong>Topic:</strong> {selectedItem.topic}
              </p>
              <p>
                <strong>Related Species:</strong> {selectedItem.relatedSpecies}
              </p>
              <p>
                <strong>Description:</strong> {selectedItem.description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuidePage;
