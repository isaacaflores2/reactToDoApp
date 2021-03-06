using Microsoft.VisualStudio.TestTools.UnitTesting;
using TodoApi.Services;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using TodoApi.Controllers;
using TodoApi.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Test
{
    [TestClass]
    public class ListControllerTest
    {
        private IListService listService;
        private List<ToDoList> data; 
        private ToDoList newList; 
        
        [TestInitialize]
        public void Setup()
        {
            //Mock Service interface
            data = TestData.TodoListData();
            listService = Substitute.For<IListService>();
            listService.Get().Returns(data);
            listService.Get("1").Returns(data[0]);            
            listService.Get("3").ReturnsNull();

            newList = new ToDoList
            {
                Id = "3",
                Name = "Hobby",
                Items = new List<Item> { new Item { Id = 0, Name = "Buy parts", IsChecked = false } }
            };
            //listService.When(x => x.Create(default)).DoNotCallBase();
            //listService.Update(Arg.Any<string>(), Arg.Any<ToDoList>()).ReturnsNull();
            //listService.Remove(Arg.Any<ToDoList>()).ReturnsNull();
            //listService.Remove(Arg.Any<string>()).ReturnsNull();  
        }

        [TestMethod]
        public void Test_Get()
        {
            //Arrange
            var controller = new ListsController(listService);

            //Act
            var result = controller.Get();

            //Assert
            Assert.IsInstanceOfType(result.Value, typeof(List<ToDoList>));
            Assert.AreEqual(result.Value.Count, 2);
        }
        
        [TestMethod]
        public void Test_Get_WithId()
        {
            //Arrange
            var controller = new ListsController(listService);

            //Act
            var result = controller.Get("1");

            //Assert
            Assert.IsInstanceOfType(result.Value, typeof(ToDoList));
            Assert.AreEqual(result.Value.Id, data[0].Id);
            Assert.AreEqual(result.Value.Name, data[0].Name);
            Assert.AreEqual(result.Value.Items.Count, data[0].Items.Count);
        }

        [TestMethod]
        public void Test_Create()
        {
            //Arrange
            var controller = new ListsController(listService);

            //Act
            var result = controller.Create(newList).Result as CreatedAtRouteResult ;
            var value = result.Value as ToDoList;

            //Assert
            Assert.IsInstanceOfType(result, typeof(CreatedAtRouteResult));
            Assert.AreEqual(result.StatusCode, 201);
            listService.Received(1).Create(newList);
            Assert.AreEqual(value.Id, newList.Id);
            Assert.AreEqual(value.Name, newList.Name);
            Assert.AreEqual(value.Items.Count, newList.Items.Count);
        }

        [TestMethod]
        public void Test_Update()
        {
            //Arrange
            var controller = new ListsController(listService);
            var updatedList = new ToDoList
            {
                Id = "1",
                Name = "Chores",
                Items = new List<Item> {
                    new Item{Id=0, Name="Laundry", IsChecked=true},
                    new Item{Id=1, Name="Dishes", IsChecked=true},
                    }
            };

            //Act
            var result = controller.Update(updatedList) as NoContentResult;            

            //Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));
            listService.Received(1).Update("1", updatedList);            
        }

        [TestMethod]
        public void Test_Update_WithNonExistingList()
        {
            //Arrange
            var controller = new ListsController(listService);
            var updatedList = new ToDoList
            {
                Id = "3",
                Name = "Test Code",
                Items = new List<Item> {
                    new Item{Id=0, Name="Arrange", IsChecked=true},
                    new Item{Id=1, Name="Act", IsChecked=true},
                    }
            };

            //Act
            var result = controller.Update(updatedList) as NotFoundResult;

            //Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
            Assert.AreEqual(result.StatusCode, 404);
            listService.DidNotReceive().Update("3", updatedList);
        }

        [TestMethod]
        public void Test_Remove()
        {
            //Arrange
            var controller = new ListsController(listService);            

            //Act
            var result = controller.Delete("1") as NoContentResult;

            //Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));
            listService.Received(1).Remove("1");
        }

        [TestMethod]
        public void Test_Remove_WithNonExistingList()
        {
            //Arrange
            var controller = new ListsController(listService);

            //Act
            var result = controller.Delete("3") as NotFoundResult;

            //Assert
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
            listService.DidNotReceive().Remove("3");
        }
    }
}
