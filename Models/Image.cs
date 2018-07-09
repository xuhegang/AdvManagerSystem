using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AdvManagerSystem.Models
{
    public class Image
    {
        [Key]
        public int ImageID { get; set; }
        public string PersonID { get; set; }
        public byte[] ImageData { get; set; }
        public string ImageMimeType { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }
    }
    public class ImageContext : DbContext, ImageDbInterface
    {
        public ImageContext() : base("name=DefaultConnection") { }
        public IDbSet<Image> ImageDB { get; set; }
        public IDbSet<Image> GetDb()
        {
            return ImageDB;
        }

    }

    public static class MoreExtensionMethods
    {
        public static IEnumerable<Image> FindByPersonID(this IEnumerable<Image> images, string pid)
        {
            return (from i in images where i.PersonID == pid select i);
        }
        public static IEnumerable<Image> FindAllImages(this IEnumerable<Image> images)
        {
            return (from i in images select i);
        }
        public static IEnumerable<Image> FindByImageID(this IEnumerable<Image> images, string Iid)
        {
            int ParsedID = int.Parse(Iid);
            return (from i in images where i.ImageID == ParsedID select i);
        }
        public static IEnumerable<Image> FindApprovedImages(this IEnumerable<Image> images)
        {
            string approved = "approve";
            return (from i in images where i.Status == approved select i);
        }
    }
}