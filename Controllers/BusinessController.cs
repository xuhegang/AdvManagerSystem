using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using AdvManagerSystem.Models;

namespace AdvManagerSystem.Controllers
{
    public class BusinessController : Controller
    {

        ImageDbInterface ImContext;

        public BusinessController(ImageDbInterface dbContext)
        {
            ImContext = dbContext;
        }

        public BusinessController()
        {
            ImContext = new ImageContext();
        }

        [Authorize(Roles = "landlord")]
        public ActionResult Landlordaction(string pid)
        {
            Image[] Images = ImContext.GetDb().FindByPersonID(pid).ToArray();
            ViewData["pid"] = pid;
            return View(Images);   
        }
        [HttpPost]
        [Authorize(Roles = "landlord")]
        public ActionResult UploadImage(string pid, HttpPostedFileBase SelectedImage, string description)
        {
            int restrictedLength = 1024 * 1024 * 5;
            string allowUploadFileType = "image";
            if (SelectedImage != null&&description.Trim().Split(' ').Length>9)
            {   
                if (SelectedImage.ContentLength < restrictedLength && SelectedImage.ContentType.IndexOf(allowUploadFileType) != -1)
                {
                    Image im = new Image
                    {
                        PersonID = pid,
                        ImageData = new byte[SelectedImage.ContentLength],
                        ImageMimeType = SelectedImage.ContentType,
                        Description = description,
                        Status = "unchecked"
                    };
                    SelectedImage.InputStream.Read(im.ImageData, 0, im.ImageData.Length);
                    // ImageContext ImContext = new ImageContext();
                    ImContext.GetDb().Add(im);
                    ImContext.SaveChanges();
                }
            }
            return RedirectToAction("Landlordaction", "Business", new { pid = pid });
        }

        [Authorize(Roles = "landlord")]
        public ActionResult showRejectReason(string imageId)
        {
            Image image = ImContext.GetDb().FindByImageID(imageId).Single();
            return View(image);
        }

        [Authorize(Roles = "officer")]
        public ActionResult Officeraction(string pid)
        {
            Image[] Images = ImContext.GetDb().FindAllImages().ToArray();
            return View(Images);
        }

        [HttpPost]
        [Authorize(Roles = "officer")]
        public void Officerajax(string iid, string status, string feedback)
        {

            Image image = ImContext.GetDb().FindByImageID(iid).Single();
            if (status == "approve")
            {
                image.Status = status;
                ImContext.SaveChanges();
            }
            else if (status == "submit")
            {
                image.Status = "reject";
                image.Feedback = feedback;
                ImContext.SaveChanges();
            }
        }
        [Authorize(Roles = "student")]
        public ActionResult Studentaction(string pid)
        {
            Image[] Images = ImContext.GetDb().FindApprovedImages().ToArray();
            return View(Images);
        }
        public bool UploadValidation(HttpPostedFileBase SelectedImage, string description)
        {
            int restrictedLength = 1024 * 1024 * 5;
            string allowUploadFileType = "image";
            if (SelectedImage.ContentLength < restrictedLength && SelectedImage.ContentType.IndexOf(allowUploadFileType) != -1)
            {
                return true;
            }
            return false;
        }
    }
}