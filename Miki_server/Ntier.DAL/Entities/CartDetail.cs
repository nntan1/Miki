﻿using System;
using System.Collections.Generic;

namespace Ntier.DAL.Entities
{
    public partial class CartDetail
    {
        public int CartId { get; set; }
        public string ProductId { get; set; } = null!;
        public int? Quantity { get; set; }
        public int? Price { get; set; }
        public string? UserId { get; set; }
        public string? CreateAt { get; set; }
        public int? SizeId { get; set; }

        public virtual Cart Cart { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
        public virtual User? User { get; set; }
    }
}
