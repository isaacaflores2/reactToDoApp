using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly IListService listService;

        public ListsController(IListService listService)
        {
            this.listService = listService;
        }

        // GET: api/v1/lists/
        [HttpGet]
        public ActionResult<List<ToDoList>> Get() =>
            listService.Get();

        // GET: api/v1/lists/{object-id}
        [HttpGet("{id:length(24)}", Name = "GetList")]
        public ActionResult<ToDoList> Get(string id)
        {
            var list = listService.Get(id);

            if(list == null)
            {
                return NotFound();
            }

            return list;
        }

        // POST: api/v1/lists
        [HttpPost]
        public ActionResult<ToDoList> Create(ToDoList list)
        {
            listService.Create(list);

            return CreatedAtRoute("GetList", new {id=list.Id}, list);
        }

        // PUT: api/v1/lists
        [HttpPut]
        public IActionResult Update(ToDoList updatedList)
        {
            string id = updatedList.Id;
            var list = listService.Get(id);

            if( list == null)
            {
                return NotFound();
            }

            listService.Update(id, updatedList);

            return NoContent();
        }

        // PUT: api/v1/lists
        [HttpPut("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var list = listService.Get(id);

            if (list == null)
            {
                return NotFound();
            }

            listService.Remove(list.Id);

            return NoContent();
        }
    }
}
